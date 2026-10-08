import * as THREE from 'three';
import gsap from 'gsap';

(function () {
    'use strict';

    /* =====================================================
       PART 1 — PAINTED BACKGROUND (4 Depth Canvas Layers)
       ===================================================== */
    const W = 1920, H = 1080;
    let seed = 11;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const hash = (x, y) => { const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return h - Math.floor(h); };
    function vnoise(x, y) {
        const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
        const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
        const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
        return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    const fbm = (x, y) => vnoise(x, y) * 0.55 + vnoise(x * 2.1, y * 2.1) * 0.3 + vnoise(x * 4.3, y * 4.3) * 0.15;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    const pal = (L) => {
        const d = [18, 66, 24], m = [60, 138, 38], l = [150, 205, 72], h = [208, 236, 122];
        if (L < 0.4) return mixc(d, m, L / 0.4);
        if (L < 0.8) return mixc(m, l, (L - 0.4) / 0.4);
        return mixc(l, h, (L - 0.8) / 0.2);
    };
    const G = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
    const mk = (id) => {
        const c = document.getElementById(id);
        if (!c) return null;
        c.width = W; c.height = H;
        return c.getContext('2d');
    };
    const poly = (g, top) => {
        g.beginPath(); g.moveTo(0, H);
        for (let x = 0; x <= W; x += 8) g.lineTo(x, top(x / W));
        g.lineTo(W, H); g.closePath();
    };

    function blob(g, x, y, r, rgb, a) {
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, `rgba(${rgb},${a})`);
        gr.addColorStop(0.6, `rgba(${rgb},${a * 0.55})`);
        gr.addColorStop(1, `rgba(${rgb},0)`);
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    }
    function cloud(g, cx, cy, w, h, alpha) {
        const puffs = [];
        for (let i = 0; i < 70; i++) {
            const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd());
            const px = cx + Math.cos(a) * rr * w / 2;
            const py = cy + Math.sin(a) * rr * h / 2 * (Math.sin(a) > 0 ? 0.55 : 1);
            puffs.push([px, py, (0.1 + rnd() * 0.22) * h * (1 - rr * 0.5)]);
        }
        puffs.sort((p, q) => p[1] - q[1]);
        for (const [x, y, r] of puffs) blob(g, x, y + r * 0.3, r * 1.05, '165,182,232', alpha * 0.5);
        for (const [x, y, r] of puffs) blob(g, x, y - r * 0.1, r, '255,255,255', alpha);
    }
    function star(g, x, y, s) {
        blob(g, x, y, s * 0.8, '255,255,255', 0.9);
        [0, Math.PI / 2].forEach((a) => {
            g.save(); g.translate(x, y); g.rotate(a);
            const gr = g.createLinearGradient(-s, 0, s, 0);
            gr.addColorStop(0, 'rgba(255,255,255,0)');
            gr.addColorStop(0.5, 'rgba(255,255,255,0.95)');
            gr.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = gr; g.fillRect(-s, -2, s * 2, 4); g.restore();
        });
    }

    // 1. Sky Canvas
    const skyCtx = mk('sky');
    if (skyCtx) {
        const g = skyCtx;
        const gr = g.createLinearGradient(0, 0, 0, H * 0.72);
        gr.addColorStop(0, '#3a8ad4'); gr.addColorStop(0.5, '#79bbee'); gr.addColorStop(1, '#dcf0fb');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        const b = g.createRadialGradient(W * 0.9, 0, 0, W * 0.9, 0, W * 0.5);
        b.addColorStop(0, 'rgba(255,255,255,0.8)'); b.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = b; g.fillRect(0, 0, W, H);
        cloud(g, W * 0.1, H * 0.5, 760, 340, 0.9);
        cloud(g, W * 0.7, H * 0.42, 980, 380, 0.85);
        cloud(g, W * 0.45, H * 0.62, 700, 200, 0.7);
        cloud(g, W * 0.32, H * 0.12, 520, 130, 0.45);
        cloud(g, W * 0.95, H * 0.2, 420, 120, 0.5);
        star(g, W * 0.1, H * 0.13, 70);
        star(g, W * 0.94, H * 0.52, 38);
    }

    // 2. Far Hills Canvas (Hazy atmospheric depth)
    const farTop = (x) => H * (0.53 - 0.05 * Math.sin(x * 4.2 + 0.8) - 0.035 * Math.sin(x * 9.5 + 2) - 0.02 * Math.sin(x * 21));
    const farCtx = mk('far');
    if (farCtx) {
        const g = farCtx;
        const gr = g.createLinearGradient(0, H * 0.4, 0, H * 0.85);
        gr.addColorStop(0, '#aedab9'); gr.addColorStop(1, '#5da35b');
        poly(g, farTop); g.fillStyle = gr; g.fill();
        g.lineCap = 'round';
        for (let i = 0; i < 30000; i++) {
            const x = rnd() * W, yt = farTop(x / W), y = yt + Math.pow(rnd(), 1.3) * H * 0.4;
            const L = clamp(0.25 + fbm(x / 200, y / 140) * 0.6 + Math.exp(-(y - yt) / 70) * 0.25, 0, 1);
            const c = mixc(pal(L), [165, 212, 196], 0.42);
            g.strokeStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`; g.lineWidth = 1;
            const len = 4 + rnd() * 4;
            g.beginPath(); g.moveTo(x, y); g.lineTo(x + (rnd() - 0.5) * 2, y - len); g.stroke();
        }
        g.globalCompositeOperation = 'source-atop';
        const hz = g.createLinearGradient(0, H * 0.35, 0, H * 0.7);
        hz.addColorStop(0, 'rgba(235,248,255,0.5)'); hz.addColorStop(1, 'rgba(235,248,255,0)');
        g.fillStyle = hz; g.fillRect(0, 0, W, H);
    }

    // 3. Mid Hills Canvas (Painted textured grass & wildflowers)
    const midTop = (x) => H * (0.84 - 0.25 * G(x, 0.27, 0.2) - 0.31 * G(x, 0.74, 0.21) - 0.2 * G(x, -0.02, 0.17) - 0.2 * G(x, 1.03, 0.14) + 0.012 * Math.sin(x * 31) + 0.006 * Math.sin(x * 77 + 1));
    const midCtx = mk('mid');
    if (midCtx) {
        const g = midCtx;
        g.lineCap = 'round';
        const base = g.createLinearGradient(0, H * 0.45, 0, H);
        base.addColorStop(0, '#2c6e1f'); base.addColorStop(1, '#14430f');
        poly(g, midTop); g.fillStyle = base; g.fill();

        function drawGrassLayer(n, dark, long) {
            for (let i = 0; i < n; i++) {
                const x = rnd() * W, yt = midTop(x / W);
                const y = yt + Math.pow(rnd(), 0.9) * (H - yt);
                const sl = (midTop((x + 8) / W) - midTop((x - 8) / W)) / 16;
                const lit = clamp(0.5 + sl * 2.2, 0, 1);
                const rim = Math.exp(-(y - yt) / 90);
                const patch = fbm(x / 240, y / 170);
                const shadow = Math.max(0, 0.45 - fbm(x / 620 + 5, y / 420 + 2)) * 1.3;
                let L = 0.28 + 0.32 * lit + 0.3 * patch + 0.35 * rim - 0.5 * shadow + (rnd() - 0.5) * 0.12;
                L = clamp(L, 0, 1) * dark;
                const c = pal(L);
                const s = 0.5 + (y / H) * 1.3;
                const len = (8 + rnd() * 10) * s * long;
                const ang = -Math.PI / 2 + (rnd() - 0.5) * 0.7 + (lit - 0.5) * 0.3;
                const bx = Math.cos(ang - 0.22) * len * 0.55, by = Math.sin(ang - 0.22) * len * 0.55;
                g.strokeStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
                g.lineWidth = 1.1 * Math.pow(s, 0.8);
                g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + bx, y + by, x + Math.cos(ang) * len, y + Math.sin(ang) * len); g.stroke();
            }
        }
        drawGrassLayer(35000, 0.65, 1.3);
        drawGrassLayer(80000, 1, 1);

        // Wildflower clusters
        function flower(x, y, r, col) {
            g.fillStyle = 'rgba(0,30,0,.25)'; g.beginPath(); g.ellipse(x, y + r * 0.5, r * 0.9, r * 0.35, 0, 0, 7); g.fill();
            g.fillStyle = col;
            for (let k = 0; k < 5; k++) {
                const a = k / 5 * Math.PI * 2 + rnd();
                g.beginPath(); g.arc(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.5, r * 0.46, 0, 7); g.fill();
            }
            g.fillStyle = '#ffe36a'; g.beginPath(); g.arc(x, y, r * 0.26, 0, 7); g.fill();
        }
        for (let k = 0; k < 38; k++) {
            const cx = rnd() * W, yt = midTop(cx / W);
            const cy = yt + 40 + rnd() * (H - yt - 80);
            const s = 0.5 + (cy / H) * 1.3, n = 5 + (rnd() * 10 | 0);
            for (let i = 0; i < n; i++) {
                const col = rnd() < 0.7 ? '#ffffff' : '#cfe4ff';
                flower(cx + (rnd() - 0.5) * 90 * s, cy + (rnd() - 0.5) * 40 * s, (3.2 + rnd() * 3) * s, col);
            }
        }

        // Valley ambient shadow & warm rim light
        g.globalCompositeOperation = 'source-atop';
        const sh = g.createRadialGradient(W * 0.5, H * 0.78, 0, W * 0.5, H * 0.78, W * 0.3);
        sh.addColorStop(0, 'rgba(6,40,24,.5)'); sh.addColorStop(1, 'rgba(6,40,24,0)');
        g.fillStyle = sh; g.fillRect(0, 0, W, H);
        const rl = g.createLinearGradient(W, 0, 0, H);
        rl.addColorStop(0, 'rgba(255,240,150,.16)'); rl.addColorStop(0.6, 'rgba(255,240,150,0)');
        g.fillStyle = rl; g.fillRect(0, 0, W, H);
    }

    // 4. Front Layer (Foreground blur, grass blades & bokeh)
    const frontCtx = mk('front');
    if (frontCtx) {
        const g = frontCtx;
        function bokeh(x, y, r, a) {
            g.fillStyle = `rgba(255,255,225,${a})`; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
            g.strokeStyle = `rgba(255,255,255,${a * 1.6})`; g.lineWidth = 2; g.stroke();
        }
        for (let i = 0; i < 16; i++) bokeh(rnd() * W, H * (0.55 + rnd() * 0.4), 12 + rnd() * 38, 0.1 + rnd() * 0.08);

        function blade(x, base, h, w, bend, c1, c2) {
            const tx = x + bend, ty = base - h;
            const gr = g.createLinearGradient(0, base, 0, ty);
            gr.addColorStop(0, c1); gr.addColorStop(1, c2);
            g.fillStyle = gr; g.beginPath(); g.moveTo(x - w, base);
            g.quadraticCurveTo(x - w * 0.6 + bend * 0.1, base - h * 0.55, tx, ty);
            g.quadraticCurveTo(x + w * 0.6 + bend * 0.5, base - h * 0.5, x + w, base);
            g.closePath(); g.fill();
        }
        const tips = ['#7fd04a', '#a8e05a', '#5fba3a', '#c4ec6a'];
        for (let i = 0; i < 340; i++) {
            const edge = rnd() < 0.7;
            const x = edge ? W * (rnd() < 0.5 ? Math.pow(rnd(), 1.6) * 0.5 : 1 - Math.pow(rnd(), 1.6) * 0.5) : rnd() * W;
            const h = (110 + rnd() * 300) * (0.4 + 1.1 * Math.abs(x / W - 0.5) * 2);
            blade(x, H + 20, h, 12 + rnd() * 16, (rnd() - 0.5) * 90, '#12480f', tips[(rnd() * tips.length) | 0]);
        }
        for (let i = 0; i < 9; i++) {
            const x = rnd() < 0.5 ? rnd() * W * 0.3 : W * (0.7 + rnd() * 0.3), y = H * (0.86 + rnd() * 0.1), r = 16 + rnd() * 14;
            g.fillStyle = 'rgba(255,255,255,.95)';
            for (let k = 0; k < 5; k++) {
                const a = k / 5 * Math.PI * 2;
                g.beginPath(); g.arc(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55, r * 0.5, 0, 7); g.fill();
            }
            g.fillStyle = '#ffe36a'; g.beginPath(); g.arc(x, y, r * 0.28, 0, 7); g.fill();
        }
    }

    document.body.classList.add('ready');

    /* =====================================================
       PART 2 — WEB AUDIO SYNTHESIZER
       ===================================================== */
    const sfx = {
        ctx: null,
        on: true,
        pop() {
            if (!this.on) return;
            try {
                this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const o = this.ctx.createOscillator(), v = this.ctx.createGain(), t = this.ctx.currentTime;
                o.type = 'sine';
                o.frequency.setValueAtTime(450, t);
                o.frequency.exponentialRampToValueAtTime(900, t + 0.08);
                v.gain.setValueAtTime(0.32, t);
                v.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
                o.connect(v); v.connect(this.ctx.destination);
                o.start(t); o.stop(t + 0.09);
            } catch (e) { /* audio unavailable */ }
        },
        chime() {
            if (!this.on) return;
            try {
                this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const freqs = [523.25, 659.25, 783.99, 1046.50];
                freqs.forEach((f, i) => {
                    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
                    const now = this.ctx.currentTime + i * 0.04;
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(f, now);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    osc.connect(gain); gain.connect(this.ctx.destination);
                    osc.start(now); osc.stop(now + 0.3);
                });
            } catch (e) { /* audio unavailable */ }
        }
    };

    const sfxToggleBtn = document.getElementById('sfx-toggle') || document.getElementById('sfx');
    if (sfxToggleBtn) {
        sfxToggleBtn.addEventListener('click', () => {
            sfx.on = !sfx.on;
            sfxToggleBtn.classList.toggle('active', sfx.on);
            sfxToggleBtn.setAttribute('aria-pressed', String(sfx.on));
            sfxToggleBtn.innerHTML = sfx.on
                ? '<i class="fa-solid fa-volume-high"></i>'
                : '<i class="fa-solid fa-volume-xmark"></i>';
            if (sfx.on) sfx.chime();
        });
    }

    /* =====================================================
       PART 3 — THREE.JS FOREGROUND (Lemons, Bubbles, Butterflies)
       ===================================================== */
    const canvas = document.getElementById('gl');
    if (!canvas) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = calm ? 0.25 : 1;
    const isSmallScreen = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const CAM_Z = 14, FOV = 40;
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, CAM_Z);

    scene.add(new THREE.HemisphereLight(0xe3f2ff, 0x7aa84a, 0.85));
    const sun = new THREE.DirectionalLight(0xfff0cf, 1.0);
    sun.position.set(4, 6, 8);
    scene.add(sun);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    function place(obj, nx, ny, z) {
        const hh = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * (CAM_Z - z);
        obj.position.set(nx * hh * camera.aspect, ny * hh, z);
    }

    // 1. Procedural Lemon Slice Texture & Geometry
    function lemonTexture() {
        const c = document.createElement('canvas'); c.width = c.height = 1024;
        const g = c.getContext('2d');
        g.fillStyle = '#ffd500'; g.fillRect(0, 0, 1024, 1024);
        g.fillStyle = '#ffd500'; g.beginPath(); g.arc(512, 512, 500, 0, 7); g.fill();
        g.fillStyle = '#f0b400';
        for (let i = 0; i < 380; i++) {
            const a = Math.random() * 6.283, r = 445 + Math.random() * 45;
            g.beginPath(); g.arc(512 + Math.cos(a) * r, 512 + Math.sin(a) * r, 1.6, 0, 7); g.fill();
        }
        g.fillStyle = '#fffdf0'; g.beginPath(); g.arc(512, 512, 436, 0, 7); g.fill();
        g.fillStyle = '#ffb300'; g.beginPath(); g.arc(512, 512, 398, 0, 7); g.fill();
        const N = 10;
        for (let s = 0; s < N; s++) {
            const a1 = s / N * 6.283 + 0.05, a2 = (s + 1) / N * 6.283 - 0.05;
            g.save(); g.beginPath(); g.moveTo(512, 512); g.arc(512, 512, 384, a1, a2); g.closePath();
            const gr = g.createRadialGradient(512, 512, 20, 512, 512, 384);
            gr.addColorStop(0, '#fff3a0'); gr.addColorStop(0.55, '#ffd21a'); gr.addColorStop(1, '#ffb800');
            g.fillStyle = gr; g.fill(); g.lineWidth = 9; g.strokeStyle = '#fffbe6'; g.stroke(); g.clip();
            g.fillStyle = 'rgba(255,246,170,.7)';
            for (let j = 0; j < 55; j++) {
                g.beginPath(); g.ellipse(512 + (Math.random() - 0.5) * 360, 512 + (Math.random() - 0.5) * 360, 6, 2.5, Math.random() * 3, 0, 7); g.fill();
            }
            g.restore();
        }
        g.fillStyle = '#fffdf0'; g.beginPath(); g.arc(512, 512, 40, 0, 7); g.fill();
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    }
    const lemonTex = lemonTexture();
    const lemonGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 64);
    const lemonFace = new THREE.MeshPhysicalMaterial({ map: lemonTex, roughness: 0.35, clearcoat: 0.5, clearcoatRoughness: 0.25 });
    const lemonSide = new THREE.MeshStandardMaterial({ color: 0xf5c400, roughness: 0.5 });

    const lemons = [];
    [
        [-0.80, 0.18, -1, 1.45],
        [-0.90, -0.42, 1, 1.0],
        [0.84, 0.22, -1, 1.35],
        [0.72, -0.46, 1, 1.1],
        [-0.52, 0.80, -2, 0.8]
    ].forEach(([nx, ny, z, s], i) => {
        const pivot = new THREE.Group();
        const m = new THREE.Mesh(lemonGeo, [lemonSide, lemonFace, lemonSide]);
        m.rotation.x = Math.PI / 2;
        pivot.add(m); pivot.scale.setScalar(s);
        scene.add(pivot);
        lemons.push({ pivot, nx, ny, z, ph: i * 1.7, dir: i % 2 ? 1 : -1 });
    });

    // 2. Soap Bubbles (Fresnel Rainbow Film Shader - Zero Artefacts)
    const bubbleGeo = new THREE.SphereGeometry(1, 48, 48);
    const bubbleBase = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
        vertexShader: `
    varying vec3 vN; varying vec3 vV;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
        fragmentShader: `
    varying vec3 vN; varying vec3 vV; uniform float uTime; uniform float uOpacity;
    void main() {
      vec3 n = normalize(vN), v = normalize(vV);
      float f = 1.0 - abs(dot(n, v));
      float rim = pow(f, 2.4);
      vec3 film = 0.5 + 0.5 * cos(6.2831 * (f * 1.3 + vec3(0.0, 0.33, 0.67) + uTime * 0.04));
      vec3 col = mix(vec3(0.86, 0.95, 1.0), film, 0.7);
      float spec = pow(max(dot(n, normalize(vec3(-0.5, 0.7, 0.6))), 0.0), 48.0);
      float spec2 = pow(max(dot(n, normalize(vec3(0.6, -0.5, 0.5))), 0.0), 30.0) * 0.35;
      float a = clamp(rim * 0.8 + 0.05 + spec + spec2, 0.0, 1.0) * uOpacity;
      gl_FragColor = vec4(col + spec + spec2, a);
    }`
    });
    const bubbles = [];
    const bubbleCount = isSmallScreen ? 12 : 22;
    for (let i = 0; i < bubbleCount; i++) {
        const mesh = new THREE.Mesh(bubbleGeo, bubbleBase.clone());
        const s = 0.28 + Math.random() * 0.5;
        bubbles.push(mesh);
        mesh.userData = {
            s, x: Math.random() * 2 - 1, y: Math.random() * 2.4 - 1.2, z: Math.random() * 4 - 2,
            v: 0.025 + Math.random() * 0.05, ph: Math.random() * 6.28, state: 'live', k: 0, fade: 1
        };
        scene.add(mesh);
    }

    // 3. Sparkles on Pop
    function glowTex() {
        const c = document.createElement('canvas'); c.width = c.height = 64;
        const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 30);
        gr.addColorStop(0, 'rgba(255,255,255,1)');
        gr.addColorStop(0.35, 'rgba(255,238,140,.85)');
        gr.addColorStop(1, 'rgba(255,210,60,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
    }
    const gtex = glowTex();
    const sparks = [];
    for (let i = 0; i < 60; i++) {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
            map: gtex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0
        }));
        sp.visible = false; scene.add(sp);
        sparks.push({ sp, vel: new THREE.Vector3(), life: 0 });
    }
    function burst(pos) {
        let n = 0;
        for (const s of sparks) {
            if (s.life > 0) continue;
            s.life = 0.5 + Math.random() * 0.5;
            s.sp.visible = true;
            s.sp.position.copy(pos);
            s.vel.set((Math.random() - 0.5) * 3, Math.random() * 2.2 + 0.4, (Math.random() - 0.5) * 1.2);
            s.sp.scale.setScalar(0.2 + Math.random() * 0.2);
            if (++n >= 14) break;
        }
    }

    // 4. Fluttering Pink Butterflies
    function wingTexture() {
        const c = document.createElement('canvas'); c.width = c.height = 512;
        const g = c.getContext('2d'); g.translate(0, 256);
        const upper = new Path2D(); upper.moveTo(0, 0);
        upper.bezierCurveTo(60, -230, 400, -250, 500, -120); upper.bezierCurveTo(520, -40, 330, -20, 0, 0);
        const lower = new Path2D(); lower.moveTo(0, 0);
        lower.bezierCurveTo(280, 10, 430, 60, 380, 170); lower.bezierCurveTo(330, 240, 120, 200, 0, 0);
        const gr = g.createLinearGradient(0, 0, 500, 0);
        gr.addColorStop(0, '#ff7eb0'); gr.addColorStop(0.6, '#ff9ec4'); gr.addColorStop(1, '#ffe0ee');
        g.fillStyle = gr; g.strokeStyle = 'rgba(255,255,255,.95)'; g.lineWidth = 8;
        [upper, lower].forEach((p) => { g.fill(p); g.stroke(p); });
        g.strokeStyle = 'rgba(190,70,120,.35)'; g.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(200, -150 + i * 55, 440, -120 + i * 55); g.stroke();
        }
        g.fillStyle = 'rgba(255,255,255,.9)';
        for (let i = 0; i < 7; i++) {
            g.beginPath(); g.arc(380 + Math.cos(i) * 40, -90 + i * 34, 6, 0, 7); g.fill();
        }
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    }
    const wingGeo = new THREE.PlaneGeometry(1, 1); wingGeo.translate(0.5, 0, 0);
    const wingMat = new THREE.MeshBasicMaterial({
        map: wingTexture(), transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, toneMapped: false
    });
    const bodyGeo = new THREE.CapsuleGeometry(0.035, 0.55, 4, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4a2438, roughness: 0.7 });
    const antGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.28, 5); antGeo.translate(0, 0.14, 0);

    function butterfly() {
        const root = new THREE.Group();
        const lp = new THREE.Group(), rp = new THREE.Group();
        const lw = new THREE.Mesh(wingGeo, wingMat); lw.scale.x = -1;
        const rw = new THREE.Mesh(wingGeo, wingMat);
        lp.add(lw); rp.add(rw);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        [-0.35, 0.35].forEach((a) => {
            const an = new THREE.Mesh(antGeo, bodyMat); an.position.y = 0.3; an.rotation.z = a; body.add(an);
        });
        root.add(lp, rp, body);
        return { root, lp, rp };
    }
    const flock = [];
    [[-0.70, 0.62], [0.78, 0.55], [0.90, -0.18], [-0.90, -0.55], [0.62, 0.86]].slice(0, isSmallScreen ? 3 : 5).forEach(([cx, cy], i) => {
        const b = butterfly();
        const s = 0.55 + Math.random() * 0.25;
        b.root.scale.setScalar(s);
        scene.add(b.root);
        flock.push({ ...b, cx, cy, ph: Math.random() * 10, sp: 11 + Math.random() * 4, z: 0.5 + (i % 3) * 0.6 });
    });

    // 5. Pointer / Touch Tracking
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
    let tx = 0, ty = 0, mx = 0, my = 0, score = 0;

    // Touch: only ONE nearest object follows the finger
    let pointerNX = 0, pointerNY = 0;
    let dragTarget = null;   // the single butterfly/lemon being dragged

    function updatePointer(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        tx = clientX / window.innerWidth * 2 - 1;
        ty = clientY / window.innerHeight * 2 - 1;
        pointerNX = tx;
        pointerNY = -ty;
    }

    function pickNearest(nx, ny) {
        // build list of all draggable objects with their current norm position
        const candidates = [];
        lemons.forEach((L) => {
            const ax = L._attrX !== undefined ? L._attrX : L.nx;
            const ay = L._attrY !== undefined ? L._attrY : L.ny;
            candidates.push({ obj: L, type: 'lemon', nx: ax, ny: ay });
        });
        flock.forEach((f) => {
            const ax = f._attrX !== undefined ? f._attrX : f.cx;
            const ay = f._attrY !== undefined ? f._attrY : f.cy;
            candidates.push({ obj: f, type: 'butterfly', nx: ax, ny: ay });
        });
        // find closest to touch point
        let best = null, bestD = Infinity;
        candidates.forEach((c) => {
            const d = (c.nx - nx) ** 2 + (c.ny - ny) ** 2;
            if (d < bestD) { bestD = d; best = c; }
        });
        return best;
    }

    window.addEventListener('pointermove', (e) => { updatePointer(e); });
    window.addEventListener('touchmove',   (e) => { updatePointer(e); e.preventDefault(); }, { passive: false });

    // On release: save dropped position as new home so element stays there
    function onRelease() {
        if (dragTarget) {
            const obj = dragTarget.obj;
            if (obj._attrX !== undefined) {
                if (dragTarget.type === 'lemon') {
                    obj.nx = obj._attrX;
                    obj.ny = obj._attrY;
                } else {
                    obj.cx = obj._attrX;
                    obj.cy = obj._attrY;
                }
            }
        }
        dragTarget = null;
    }

    // Single unified pointer/touch down handler:
    // 1. If a bubble is hit → pop it, do NOT drag any element
    // 2. If no bubble hit  → pick nearest lemon/butterfly to drag
    function onPress(e) {
        if (e.target.closest('a, button, input, textarea, .navbar-custom, .glass-box, .project-card, .skill-card-group, .modal-glass-content')) return;
        updatePointer(e);

        // Check bubble hit first
        ptr.set(
            (e.touches ? e.touches[0].clientX : e.clientX) / window.innerWidth * 2 - 1,
            -((e.touches ? e.touches[0].clientY : e.clientY) / window.innerHeight) * 2 + 1
        );
        ray.setFromCamera(ptr, camera);
        const live = bubbles.filter((b) => b.userData.state === 'live');
        const hit = ray.intersectObjects(live)[0];
        if (hit) {
            // Pop bubble — don't start a drag
            const b = hit.object;
            b.userData.state = 'pop'; b.userData.k = 0;
            burst(b.position);
            sfx.pop();
            score++;
            const chipScore = document.getElementById('score');
            if (chipScore) chipScore.textContent = score;
            dragTarget = null;
            return;
        }

        // No bubble hit → drag nearest element
        dragTarget = pickNearest(pointerNX, pointerNY);
    }

    window.addEventListener('pointerdown', onPress);
    window.addEventListener('touchstart',  (e) => onPress(e), { passive: true });

    window.addEventListener('pointerup',     onRelease);
    window.addEventListener('pointercancel', onRelease);
    window.addEventListener('touchend',      onRelease);
    window.addEventListener('touchcancel',   onRelease);

    const layers = [...document.querySelectorAll('.layer')];
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;

        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;

        if (!calm) {
            const f = Math.min(1, window.innerWidth / 1400);
            layers.forEach((l) => {
                const k = +l.dataset.k * f;
                l.style.transform = `translate3d(${-mx * k}px,${-my * k * 0.6}px,0)`;
            });
        }
        camera.position.x = mx * 0.35;
        camera.position.y = -my * 0.2;
        camera.lookAt(0, 0, 0);

        bubbleBase.uniforms.uTime.value = t;

        // Lemons: gentle float, only dragged one follows pointer
        lemons.forEach((L) => {
            const baseY = L.ny + Math.sin(t * 1.3 * motion + L.ph) * 0.025;
            const baseX = L.nx;

            const isTarget = dragTarget && dragTarget.obj === L;
            if (isTarget) {
                // directly follow pointer — no drift back
                L._attrX = L._attrX !== undefined ? L._attrX : baseX;
                L._attrY = L._attrY !== undefined ? L._attrY : baseY;
                L._attrX += (pointerNX - L._attrX) * 0.28;
                L._attrY += (pointerNY - L._attrY) * 0.28;
            } else {
                // just float around current home (no snap-back)
                L._attrX = baseX;
                L._attrY = baseY;
            }
            place(L.pivot, L._attrX !== undefined ? L._attrX : baseX,
                           L._attrY !== undefined ? L._attrY : baseY, L.z);

            L.pivot.rotation.set(
                Math.sin(t * 0.6 * motion + L.ph) * 0.4,
                Math.sin(t * 0.5 * motion + L.ph * 1.3) * 0.5,
                L.dir * t * 0.12 * motion + L.ph
            );
        });

        // Bubbles float & pop
        bubbles.forEach((b) => {
            const u = b.userData; b.material.uniforms.uTime.value = t;
            let sc = u.s;
            if (u.state === 'pop') {
                u.k += dt / 0.16;
                sc = u.s * (1 + 0.35 * u.k);
                b.material.uniforms.uOpacity.value = Math.max(0, 1 - u.k);
                if (u.k >= 1) { u.state = 'live'; u.y = -1.3; u.x = Math.random() * 2 - 1; u.fade = 0; }
            } else {
                u.y += u.v * dt * motion;
                if (u.y > 1.3) { u.y = -1.3; u.x = Math.random() * 2 - 1; }
                if (u.fade < 1) u.fade = Math.min(1, u.fade + dt * 1.5);
                b.material.uniforms.uOpacity.value = u.fade;
            }
            place(b, u.x + Math.sin(t * 0.9 * motion + u.ph) * 0.02, u.y, u.z);
            const w = 1 + Math.sin(t * 2.2 + u.ph) * 0.02;
            b.scale.set(sc * w, sc / w, sc * w);
        });

        // Butterfly fluttering flight, only dragged one follows pointer
        flock.forEach((f) => {
            const a = t * 0.5 * motion + f.ph, beat = Math.sin(t * f.sp * motion + f.ph);
            const vx = Math.cos(a), vy = Math.cos(a * 1.6);
            const baseX = f.cx + Math.sin(a) * 0.1;
            const baseY = f.cy + Math.sin(a * 1.6) * 0.07 + beat * 0.004;

            const isTarget = dragTarget && dragTarget.obj === f;
            if (isTarget) {
                f._attrX = f._attrX !== undefined ? f._attrX : baseX;
                f._attrY = f._attrY !== undefined ? f._attrY : baseY;
                f._attrX += (pointerNX - f._attrX) * 0.25;
                f._attrY += (pointerNY - f._attrY) * 0.25;
            } else {
                // float around current home (stays at dropped position)
                f._attrX = baseX;
                f._attrY = baseY;
            }
            place(f.root, f._attrX !== undefined ? f._attrX : baseX,
                          f._attrY !== undefined ? f._attrY : baseY, f.z);

            const ang = 0.35 + (beat * 0.5 + 0.5) * 0.75;
            f.rp.rotation.y = ang; f.lp.rotation.y = -ang;
            f.root.rotation.set(0.35 + vy * 0.12, vx * 0.3, -vx * 0.3);
        });

        // Sparkles
        sparks.forEach((s) => {
            if (s.life <= 0) return;
            s.life -= dt;
            s.vel.y -= 2.2 * dt;
            s.sp.position.addScaledVector(s.vel, dt);
            s.sp.material.opacity = Math.max(0, s.life * 1.6);
            if (s.life <= 0) s.sp.visible = false;
        });

        renderer.render(scene, camera);
    }
    animate();

})();

/* =====================================================
   PART 4 — UI INTERACTIVITY (Portfolio, Filter, Modal)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Category Filter Pills
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            sfx.chime();
            filterPills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');

            const cat = pill.getAttribute('data-category');

            projectCards.forEach((card) => {
                const cardCat = card.getAttribute('data-category');
                if (cat === 'all' || cardCat === cat) {
                    card.style.display = 'flex';
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
                    );
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Detail Modal
    const modalBackdrop = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-description');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');

    document.querySelectorAll('.btn-view-project').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sfx.chime();

            const card = btn.closest('.project-card');
            const title = card.querySelector('.project-title')?.innerText || '';
            const category = card.querySelector('.project-category-tag')?.innerText || '';
            const desc = card.querySelector('.project-description')?.innerText || '';
            const imgSrc = card.querySelector('.project-thumb-img')?.src || '';

            if (modalTitle) modalTitle.innerText = title;
            if (modalCategory) modalCategory.innerText = category;
            if (modalDesc) modalDesc.innerText = desc;
            if (modalImg) modalImg.src = imgSrc;

            if (modalBackdrop) modalBackdrop.classList.add('active');
        });
    });

    if (closeModalBtn && modalBackdrop) {
        closeModalBtn.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('active');
            }
        });
    }

    // Hero Card 3D Tilt
    const heroCard = document.querySelector('.hero-glass-card');
    if (heroCard) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 55;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 55;
            heroCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // Certificate Popup — auto-detect PDF vs Gambar
    // Certificate Popup — auto-detect PDF vs Gambar
    const certPopup       = document.getElementById('cert-popup');
    const certPopupPdf    = document.getElementById('cert-popup-pdf');
    const certPopupImg    = document.getElementById('cert-popup-img');
    const certPlaceholder = document.getElementById('cert-popup-placeholder');

    window.openCertificate = function(fileSrc) {
        if (!fileSrc) return;
        
        // Jika nama file belum ada ekstensi, default coba .pdf
        let finalSrc = fileSrc;
        if (!finalSrc.includes('.') && !finalSrc.endsWith('/')) {
            finalSrc += '.pdf';
        }

        const isPdf = finalSrc.toLowerCase().endsWith('.pdf');

        // Reset display
        if (certPopupPdf)    { certPopupPdf.style.display    = 'none'; certPopupPdf.src = ''; }
        if (certPopupImg)    { certPopupImg.style.display    = 'none'; certPopupImg.src = ''; }
        if (certPlaceholder) { certPlaceholder.style.display = 'none'; }

        if (isPdf) {
            if (certPopupPdf) {
                certPopupPdf.src           = finalSrc;
                certPopupPdf.style.display = 'block';
            }
        } else {
            if (certPopupImg) {
                certPopupImg.style.display = 'block';
                certPopupImg.onerror = () => {
                    certPopupImg.style.display    = 'none';
                    if (certPlaceholder) certPlaceholder.style.display = 'block';
                };
                certPopupImg.src = finalSrc;
            }
        }

        if (certPopup) {
            certPopup.style.display = 'flex';
        }
    };

    document.querySelectorAll('.btn-view-cert').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileSrc = btn.dataset.certFile || btn.dataset.certImg || '';
            window.openCertificate(fileSrc);
        });
    });
});