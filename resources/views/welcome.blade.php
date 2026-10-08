<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tasya Putri Nasafa — Portofolio</title>
    <link rel="icon" type="image/jpeg" href="{{ asset('favicon.jpg') }}?v=3">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Fredoka:wght@500;600;700&family=Great+Vibes&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Vite Assets -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>

<body>

    <!-- Painted Background Layers (Procedural 2D Canvas with Depth & Parallax) -->
    <div class="scene" aria-hidden="true">
        <div class="layer" data-k="6"><canvas id="sky"></canvas></div>
        <div class="layer far" data-k="12"><canvas id="far"></canvas></div>
        <div class="layer" data-k="22"><canvas id="mid"></canvas></div>
        <div class="layer front" data-k="40"><canvas id="front"></canvas></div>
    </div>

    <!-- 3D WebGL Interactive Foreground Canvas -->
    <canvas id="gl" aria-hidden="true"></canvas>

    <!-- UI Overlay Wrapper -->
    <div class="ui-wrapper">

        <!-- Navigation Bar -->
        <nav class="navbar-custom">
            <ul class="nav-menu" id="nav-menu">
                <li><a href="#hero" class="nav-link active">Home</a></li>
                <li><a href="#about" class="nav-link">Tentang Saya</a></li>
                <li><a href="#education" class="nav-link">Pendidikan</a></li>
                <li><a href="#experience" class="nav-link">Pengalaman</a></li>
                <li><a href="#portfolio" class="nav-link">Portofolio</a></li>
                <li><a href="#skills" class="nav-link">Keahlian</a></li>
                <li><a href="#contact" class="nav-link">Kontak</a></li>
            </ul>

            <div class="nav-actions">
                <button class="btn-icon-round active" id="sfx-toggle" title="Toggle Sound SFX">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
                <a href="#contact" class="btn-fresh-primary" style="padding: 8px 20px; font-size: 0.88rem;">
                    Hire Me <i class="fa-solid fa-paper-plane"></i>
                </a>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="hero-section">
            <div class="hero-glass-card">
                <!-- Sparkle Decorative Icons -->
                <i class="fa-solid fa-sparkles hero-sparkle sparkle-top-left"></i>
                <i class="fa-solid fa-sparkles hero-sparkle sparkle-bottom-right"></i>
                <i class="fa-solid fa-star hero-sparkle sparkle-top-right"></i>

                <h1 class="title" aria-label="Creative Portofolio">
                    <span class="word" aria-hidden="true"><span class="cap">P</span>ORTO<i
                            class="lemon"></i>FOLIO</span>
                </h1>

                <div class="hero-subtitles">
                    <span class="hero-name">Tasya Putri Nasafa</span>
                    <span class="hero-details">Sistem Informasi 2022-2026 </span>
                </div>
            </div>
        </section>

        <!-- About Me Section -->
        <section id="about" class="section-container">
            <div class="section-header">
                <span class="section-tag"><i class="fa-solid fa-user-tie"></i> Profil Saya</span>
                <h2 class="about-section-title">Tentang Saya</h2>
            </div>
            <div class="glass-box">
                <div class="about-grid">
                    <div class="profile-avatar-wrapper">
                        <img src="{{ asset('images/tasya3.png') }}" alt="Tasya Putri Nasafa" class="profile-avatar-img">
                    </div>
                    <div class="about-text-content">
                        <h3>Hallo!, Saya Tasya Putri Nasafa</h3>
                        <p>
                            Saya Lulusan Sarjana
                            sistem Informasi dari Universitas Gunadarma.
                            Memiliki pengalaman di bidang pengembangan perangkat lunak dan
                            Teknologi Informasi yang membentuk kemampuan dalam analisis sistem,
                            pengembangan website, dan perancangan sistem.
                        </p>
                        <p>
                            Memiliki kemampuan
                            dalam kerja sama tim, manajemen waktu, pemecahan masalah, dan
                            komunikasi. Mampu bekerja secara individu maupun tim dalam
                            menyelesaikan proyek dengan baik. Tertarik untuk mengembangkan karier
                            di bidang Teknologi dan Sistem Informasi serta terus meningkatkan
                            kompetensi melalui pengalaman profesional.
                        </p>

                        <div style="margin-top: 30px;">
                            <a href="{{ asset('CV-ATS-Tasya-Putri-Nasafa.pdf') }}" class="btn-fresh-primary"
                                download="CV-ATS-Tasya-Putri-Nasafa.pdf">
                                <i class="fa-solid fa-download"></i> Unduh Curriculum Vitae
                            </a>
                        </div>
                    </div>
                </div>
        </section>

        <!-- Education Section -->
        <section id="education" class="section-container" style="padding-bottom: 30px;">
            <div class="section-header">
                <span class="section-tag"><i class="fa-solid fa-graduation-cap"></i> Riwayat Akademik</span>
                <h2 class="section-title">Pendidikan Formal</h2>
            </div>

            <div class="edu-timeline">
                <div class="edu-card">
                    <div class="edu-dot"><i class="fa-solid fa-university"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">2022 — 2026</span>
                        <h3 class="edu-title">S1 Sistem Informasi</h3>
                        <p class="edu-institution"><i class="fa-solid fa-building-columns"></i> Universitas Gunadarma
                        </p>
                        <p class="edu-desc">Mempelajari analisis sistem, pengembangan perangkat lunak, pengelolaan data,
                            serta teknologi informasi. Berpengalaman dalam berbagai proyek pengembangan aplikasi
                            berbasis web.</p>
                    </div>
                </div>

                <div class="edu-card">
                    <div class="edu-dot"><i class="fa-solid fa-school-flag"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">2019 — 2022</span>
                        <h3 class="edu-title">SMA / Sekolah Menengah Atas</h3>
                        <p class="edu-institution"><i class="fa-solid fa-building-columns"></i> SMAN 6 KOTA BEKASI</p>
                        <p class="edu-desc">Jurusan IPA dengan fokus pada matematika, fisika, dan ilmu komputer dasar.
                            Aktif dalam kegiatan ekstrakulikuler dan organisasi sekolah.</p>
                    </div>
                </div>
            </div>

        </section>

        <!-- Experience Section (Dedicated Modern Grid Showcase) -->
        <section id="experience" class="section-container">
            <div class="section-header">
                <span class="section-tag"><i class="fa-solid fa-briefcase"></i> Jejak Karier &amp; Praktik</span>
                <h2 class="section-title">Pengalaman </h2>
            </div>

            <div class="experience-grid">
                <!-- Card 1: Programmer - Laboratorium Akuntansi Lanjut A -->
                <div class="exp-modern-card">
                    <div class="exp-header">
                        <div class="exp-role-wrap">
                            <div class="exp-icon-box" style="background: linear-gradient(135deg, #FFDE00, #FFA800);">
                                <i class="fa-solid fa-laptop-code"></i>
                            </div>
                            <div>
                                <h3 class="exp-role-title">Programmer</h3>
                                <div class="exp-company">
                                    <i class="fa-solid fa-building-columns"></i> Laboratorium Akuntansi Lanjut A
                                </div>
                            </div>
                        </div>
                        <span class="exp-badge-period">Part Time (2024 — 2026)</span>
                    </div>

                    <!-- Split Grid: 2 Foto Dokumentasi Bersebelahan -->
                    <div class="exp-grid-split">
                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/1.jpeg') }}" alt="Dokumentasi Praktikum 1"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya3.png') }}';">
                        </div>

                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/2.jpeg') }}" alt="Dokumentasi Praktikum 2"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya.jpeg') }}';">
                        </div>
                    </div>

                    <p class="exp-body-text">
                        Melakukan maintenance sistem dan software praktikum secara berkala, memberikan bimbingan kepada praktikan dalam perancangan sistem dan pemecahan masalah teknis, serta menangani kendala teknis selama kegiatan praktikum berlangsung. Berkoordinasi dalam pengelolaan kebutuhan teknis untuk mendukung kelancaran kegiatan praktikum.
                    </p>

                    <div class="exp-footer">
                        <div class="exp-tags-list">
                            <span class="edu-chip">Maintenance</span>
                            <span class="edu-chip">Programming</span>
                            <span class="edu-chip">Troubleshooting</span>
                            <span class="edu-chip">Tutor</span>
                            <span class="edu-chip">Teamwork</span>
                             <span class="edu-chip">Technical Support</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Programmer - PT. Fortunet Solusi Indonesia -->
                <div class="exp-modern-card">
                    <div class="exp-header">
                        <div class="exp-role-wrap">
                            <div class="exp-icon-box" style="background: linear-gradient(135deg, #FF2E93, #FF6584);">
                                <i class="fa-solid fa-code"></i>
                            </div>
                            <div>
                                <h3 class="exp-role-title">Programmer</h3>
                                <div class="exp-company">
                                    <i class="fa-solid fa-building"></i> PT. Fortunet Solusi Indonesia
                                </div>
                            </div>
                        </div>
                        <span class="exp-badge-period">Internship (2025 — 2026)</span>
                    </div>

                    <!-- Split Grid: 2 Foto Dokumentasi Bersebelahan -->
                    <div class="exp-grid-split">
                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/3.jpeg') }}" alt="Dokumentasi Kerja 1"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya2.jpeg') }}';">
                        </div>

                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/4.jpeg') }}" alt="Dokumentasi Kerja 2"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya3.png') }}';">
                        </div>
                    </div>

                    <p class="exp-body-text">
                        Mengembangkan sistem informasi berbasis web untuk mendukung pengelolaan data karyawan, penggajian, dan kebutuhan operasional perusahaan. Melakukan analisis kebutuhan pengguna, pengolahan serta dokumentasi data, dan pengembangan sistem sesuai kebutuhan operasional.
                    </p>

                    <div class="exp-footer">
                        <div class="exp-tags-list">
                            <span class="edu-chip">Web Development</span>
                            <span class="edu-chip">Laravel &amp; MySQL</span>
                            <span class="edu-chip">Analisis Sistem</span>
                            <span class="edu-chip">Database Management</span>
                            <span class="edu-chip">Problem Solving</span>
                            <span class="edu-chip">Collaboration</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3: Project Client - Website SMK Gema Karya Bahana -->
                <div class="exp-modern-card">
                    <div class="exp-header">
                        <div class="exp-role-wrap">
                            <div class="exp-icon-box" style="background: linear-gradient(135deg, #00C9FF, #2673e8);">
                                <i class="fa-solid fa-globe"></i>
                            </div>
                            <div>
                                <h3 class="exp-role-title">Project Client</h3>
                                <div class="exp-company">
                                    <i class="fa-solid fa-building"></i> SMK Gema Karya Bahana
                                </div>
                            </div>
                        </div>
                      
                    </div>

                    <div class="exp-grid-split">
                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/5.jpeg') }}" alt="Proyek website SMK Gema Karya Bahana 1"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya2.jpeg') }}';">
                        </div>

                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/6.jpeg') }}" alt="Proyek website SMK Gema Karya Bahana 2"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya3.png') }}';">
                        </div>
                    </div>

                    <p class="exp-body-text">
                        Terlibat dalam pengembangan website SMK Gema Karya Bahana sebagai project client PT. Fortunet Solusi Indonesia. Mengembangkan website berdasarkan kebutuhan client, mulai dari analisis kebutuhan, perancangan, pengembangan, hingga implementasi. Melakukan koordinasi, testing, dan perbaikan untuk memastikan website berjalan sesuai kebutuhan.
                    </p>

                    <div class="exp-footer">
                        <div class="exp-tags-list">
                            <span class="edu-chip">Laravel</span>
                            <span class="edu-chip">MySQL</span>
                            <span class="edu-chip">Web Development</span>
                            <span class="edu-chip">Client Handling</span>
                        </div>
                    </div>
                </div>

                <!-- Card 4: Speaker - Technology & Artificial Intelligence Education -->
                <div class="exp-modern-card">
                    <div class="exp-header">
                        <div class="exp-role-wrap">
                            <div class="exp-icon-box" style="background: linear-gradient(135deg, #FF6584, #FF2E93);">
                                <i class="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <div>
                                <h3 class="exp-role-title"> Edukasi Teknologi &amp; Artificial Intelligence</h3>
                                <div class="exp-company">
                                    <i class="fa-solid fa-school"></i> SMK Yadika 4 Bekasi
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="exp-grid-split">
                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/7.jpeg') }}" alt="Kegiatan edukasi teknologi dan AI 1"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya2.jpeg') }}';">
                        </div>

                        <div class="exp-split-photo">
                            <img src="{{ asset('images/experiences/8.jpeg') }}" alt="Kegiatan edukasi teknologi dan AI 2"
                                onerror="this.onerror=null; this.src='{{ asset('images/tasya3.png') }}';">
                        </div>
                    </div>

                    <p class="exp-body-text">
                        Menjadi pemateri dalam kegiatan edukasi teknologi kepada siswa SMK dengan tema “Building Apps Faster with AI”. Membawakan materi mengenai perkembangan AI, pemanfaatannya dalam pengembangan aplikasi, serta demonstrasi penggunaan AI untuk membantu proses ideasi, coding, dan problem solving. 
                    </p>

                    <div class="exp-footer">
                        <div class="exp-tags-list">
                            <span class="edu-chip">Public Speaking</span>
                            <span class="edu-chip">Artificial Intelligence</span>
                            <span class="edu-chip">Technology Education</span>
                            <span class="edu-chip">Presentation</span>
                            <span class="edu-chip">Mentoring</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Certification & Training Section -->
        <section id="certifications" class="section-container">
            <div class="section-header" style="margin-top: 75px; margin-bottom: 45px;">
                <span class="section-tag" style="background: rgba(255, 222, 0, 0.25); border-color: rgba(255, 222, 0, 0.65); color: #8c6000;">
                    <i class="fa-solid fa-certificate"></i> Lisensi &amp; Pelatihan
                </span>
                <h2 class="section-title">Sertifikasi &amp; Pelatihan</h2>
            </div>

            <div class="edu-timeline">
                <div class="edu-card">
                    <div class="edu-dot" style="background: linear-gradient(135deg, #FFDE00, #FFA800);"><i
                            class="fa-solid fa-certificate"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">Part time</span>
                        <h3 class="edu-title">Programmer</h3>
                        <p class="edu-institution"><i class="fa-solid fa-medal"></i> Laboratorium Akuntansi Lanjut A</p>
                        <button type="button" class="btn-view-cert"
                            data-cert-file="{{ asset('images/certificates/sertiflabala.pdf') }}"
                            data-cert-title="Programmer" data-cert-issuer="Asisten Laboratorium Akuntansi Lanjut A"
                            data-cert-year="2024-2026"
                            onclick="if(window.openCertificate){window.openCertificate(this.dataset.certFile);}">
                            <i class="fa-solid fa-id-card"></i> Lihat Sertifikat
                        </button>
                    </div>
                </div>

                <div class="edu-card">
                    <div class="edu-dot" style="background: linear-gradient(135deg, #FF6584, #FF2E93);"><i
                            class="fa-solid fa-palette"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">intersnship</span>
                        <h3 class="edu-title">Programmer</h3>
                        <p class="edu-institution"><i class="fa-solid fa-medal"></i> PT.Fortunet Solusi Indonesia</p>
                        <button type="button" class="btn-view-cert"
                            data-cert-file="{{ asset('images/certificates/sertifikatmagang.pdf') }}"
                            data-cert-title="Programmer" data-cert-issuer="PT.Fortunet Solusi Indonesia"
                            data-cert-year="2025-2026"
                            onclick="if(window.openCertificate){window.openCertificate(this.dataset.certFile);}">
                            <i class="fa-solid fa-id-card"></i> Lihat Sertifikat
                        </button>
                    </div>
                </div>

                <div class="edu-card">
                    <div class="edu-dot" style="background: linear-gradient(135deg, #00C9FF, #92FE9D);"><i
                            class="fa-solid fa-award"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">BNSP</span>
                        <h3 class="edu-title">Sertifikasi Profesi Junior Web Programmer</h3>
                        <p class="edu-institution"><i class="fa-solid fa-medal"></i> BNSP by Universitas Gunadarma</p>
                        <button type="button" class="btn-view-cert"
                            data-cert-file="{{ asset('images/certificates/SertifikatBNSP.pdf') }}"
                            data-cert-title="Sertifikasi Profesi Junior Web Programmer"
                            data-cert-issuer="BNSP by Universitas Gunadarma" data-cert-year="BNSP"
                            onclick="if(window.openCertificate){window.openCertificate(this.dataset.certFile);}">
                            <i class="fa-solid fa-id-card"></i> Lihat Sertifikat
                        </button>
                    </div>
                </div>

                <div class="edu-card">
                    <div class="edu-dot" style="background: linear-gradient(135deg, #f12711, #f5af19);"><i
                            class="fa-solid fa-database"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">Database</span>
                        <h3 class="edu-title">Oracle For Intermediate</h3>
                        <p class="edu-institution"><i class="fa-solid fa-medal"></i> Oracle Certification</p>
                        <button type="button" class="btn-view-cert"
                            data-cert-file="{{ asset('images/certificates/Sertifikatoracle.pdf') }}"
                            data-cert-title="ORACLE FOR INTERMEDIATE" data-cert-issuer="Oracle" data-cert-year="Oracle"
                            onclick="if(window.openCertificate){window.openCertificate(this.dataset.certFile);}">
                            <i class="fa-solid fa-id-card"></i> Lihat Sertifikat
                        </button>
                    </div>
                </div>

                <div class="edu-card">
                    <div class="edu-dot" style="background: linear-gradient(135deg, #0494cc, #035b80);"><i
                            class="fa-solid fa-network-wired"></i></div>
                    <div class="edu-body">
                        <span class="edu-period">Networking</span>
                        <h3 class="edu-title">Wide Area Network Using Cisco Router For Intermediate</h3>
                        <p class="edu-institution"><i class="fa-solid fa-medal"></i> Cisco Network Training</p>
                        <button type="button" class="btn-view-cert"
                            data-cert-file="{{ asset('images/certificates/Sertifikatcisco.pdf') }}"
                            data-cert-title="WIDE AREA NETWORK USING CISCO ROUTER FOR INTERMEDIATE"
                            data-cert-issuer="Cisco" data-cert-year="Cisco"
                            onclick="if(window.openCertificate){window.openCertificate(this.dataset.certFile);}">
                            <i class="fa-solid fa-id-card"></i> Lihat Sertifikat
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Portfolio Gallery Section -->
        <section id="portfolio" class="section-container">
            <div class="section-header">
                <span class="section-tag"><i class="fa-solid fa-images"></i> Project Pilihan</span>
                <h2 class="section-title">Project Saya</h2>
            </div>

            <div class="portfolio-grid">
                <!-- Project Card 1: CCTV Monitoring & Face Recognition System -->
                <div class="project-card" data-category="computer-vision">
                    <div class="project-thumb-container">
                        <img src="{{ asset('images/experiences/9.jpeg') }}"
                            alt="Registrasi wajah dan monitoring deteksi melalui dashboard" class="project-thumb-img">
                        <span class="project-category-tag">Computer Vision</span>
                    </div>
                    <div class="project-details">
                        <h3 class="project-title">CCTV Monitoring &amp; Face Recognition System</h3>
                        <p class="project-description">Mengembangkan sistem monitoring CCTV dengan fitur deteksi dan pengenalan wajah secara real-time. Sistem menampilkan live camera, mendeteksi wajah yang tertangkap kamera, serta menyediakan fitur registrasi wajah dan monitoring hasil deteksi melalui dashboard.</p>
                        <div class="project-footer">
                            <div class="project-tech-tags">
                                <span class="tech-chip">Computer Vision</span>
                                <span class="tech-chip">Face Recognition</span>
                                <span class="tech-chip">CCTV Integration</span>
                                <span class="tech-chip">Real-Time Detection</span>
                                <span class="tech-chip">Web Development</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Card 2: Thehoove Cafe Ordering & Menu Recommendation System -->
                <div class="project-card" data-category="web-development">
                    <div class="project-thumb-container">
                        <img src="{{ asset('images/experiences/10.png') }}"
                            alt="Sistem pemesanan Thehoove Cafe" class="project-thumb-img">
                        <span class="project-category-tag">Web Development</span>
                    </div>
                    <div class="project-details">
                        <h3 class="project-title">Sistem Pemesanan dan Rekomendasi Menu Thehoove Cafe</h3>
                        <p class="project-description">Mengembangkan website pemesanan Thehoove Cafe untuk pengguna dan admin. Sistem pengguna mencakup registrasi, pemesanan, keranjang, pembayaran, status pesanan, serta rekomendasi menu berdasarkan preferensi pengguna. Sisi admin digunakan untuk mengelola menu, kategori, pengguna, dan pesanan secara terintegrasi.</p>
                        <div class="project-footer">
                            <div class="project-tech-tags">
                                <span class="tech-chip">Laravel</span>
                                <span class="tech-chip">MySQL</span>
                                <span class="tech-chip">Web Development</span>
                                <span class="tech-chip">System Analysis</span>
                                <span class="tech-chip">Recommendation System</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Card 3: SMK Gema Karya Bahana Profile Website -->
                <div class="project-card" data-category="client-project">
                    <div class="project-thumb-container">
                        <img src="{{ asset('images/experiences/12.png') }}"
                            alt="Website profil SMK Gema Karya Bahana" class="project-thumb-img">
                        <span class="project-category-tag">Client Project</span>
                    </div>
                    <div class="project-details">
                        <h3 class="project-title">Website Profil SMK Gema Karya Bahana</h3>
                        <p class="project-description">Mengembangkan website profil SMK Gema Karya Bahana untuk project client PT. Fortunet Solusi Indonesia, mencakup informasi sekolah, program keahlian, prestasi, berita, dan event. Melakukan pengujian serta penyesuaian website sesuai kebutuhan client.</p>
                        <div class="project-footer">
                            <div class="project-tech-tags">
                                <span class="tech-chip">Client Project</span>
                                <span class="tech-chip">Web Development</span>
                                <span class="tech-chip">System Development</span>
                                <span class="tech-chip">Responsive Design</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Skills & Software Section -->
        <section id="skills" class="section-container">
            <div class="section-header">
                <span class="section-tag"><i class="fa-solid fa-laptop-code"></i> Toolkit & Tech</span>
                <h2 class="section-title">KETERAMPILAN</h2>
            </div>

            <div class="skills-grid">
                <div class="skill-card-group skill-card-list">
                    <div class="skill-group-title">
                        <div class="skill-icon-badge"><i class="fa-solid fa-toolbox"></i></div>
                        <span>Technical Skills</span>
                    </div>

                    <ul class="skill-list">
                        <li>Microsoft Office</li>
                        <li>MySQL</li>
                        <li>Database Management System (DBMS)</li>
                        <li>Data Management</li>
                        <li>Software Testing</li>
                        <li>Web Development</li>
                        <li>System Analysis</li>
                        <li>UI/UX Design</li>
                    </ul>
                </div>

                <div class="skill-card-group skill-card-list">
                    <div class="skill-group-title">
                        <div class="skill-icon-badge" style="background: linear-gradient(135deg, #FFDE00, #FFA800);"><i
                                class="fa-solid fa-people-group"></i></div>
                        <span>Non-Technical / Soft Skills</span>
                    </div>

                    <ul class="skill-list">
                        <li>Problem Solving</li>
                        <li>Communication</li>
                        <li>Teamwork</li>
                        <li>Time Management</li>
                        <li>Adaptability</li>
                        <li>Public Speaking</li>
                        <li>Attention to Detail</li>
                    </ul>
                </div>
            </div>

        </section>

        <!-- Contact Section -->
        <section id="contact" class="section-container">
            <div class="glass-box">
                <div class="contact-container">
                    <div class="contact-info-card">
                        <span class="section-tag"><i class="fa-solid fa-paper-plane"></i> Hubungi Saya</span>
                       
                      

                        <div class="contact-info-item">
                            <div class="contact-icon-box"><i class="fa-solid fa-envelope"></i></div>
                            <div>
                                <h4 style="color: #1e293b; font-weight: 700;">Email</h4>
                                <p style="color: #64748b;">tasyaputrinasafa@gmail.com</p>
                            </div>
                        </div>

                        <div class="contact-info-item">
                            <div class="contact-icon-box" style="color: #5bb026;"><i class="fa-brands fa-whatsapp"></i>
                            </div>
                            <div>
                                <h4 style="color: #1e293b; font-weight: 700;">WhatsApp Direct</h4>
                                <p style="color: #64748b;">+62 818-0716-0284</p>
                            </div>
                        </div>

                        <div class="contact-info-item">
                            <div class="contact-icon-box" style="color: #ffde00;"><i
                                    class="fa-solid fa-location-dot"></i></div>
                            <div>
                                <h4 style="color: #1e293b; font-weight: 700;">Lokasi</h4>
                                <p style="color: #64748b;">Kota Bekasi,Jawa Barat</p>
                            </div>
                        </div>
                    </div>

                    <div class="contact-form-card">
                        @if (session('contact_status'))
                            <div class="alert alert-success" role="status">{{ session('contact_status') }}</div>
                        @endif
                        @if (session('contact_error'))
                            <div class="alert alert-danger" role="alert">{{ session('contact_error') }}</div>
                        @endif
                        @if ($errors->any())
                            <div class="alert alert-danger" role="alert">
                                Mohon periksa kembali isian formulir Anda.
                            </div>
                        @endif

                        <form action="{{ route('contact.send') }}" method="POST">
                            @csrf
                            <input type="text" name="name" value="{{ old('name') }}"
                                placeholder="Nama Lengkap Anda" maxlength="100" required>
                            <input type="email" name="email" value="{{ old('email') }}"
                                placeholder="Alamat Email Anda" maxlength="255" required>
                            <textarea name="message" rows="4" maxlength="5000"
                                placeholder="Tuliskan pesan atau detail proyek Anda di sini..."
                                required>{{ old('message') }}</textarea>
                            <button type="submit" class="btn-fresh-primary"
                                style="width: 100%; justify-content: center;">
                                <i class="fa-solid fa-paper-plane"></i> Kirim Pesan Sekarang
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer>
            <div
                style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                    <strong style="color: var(--color-primary-blue);">Tasya Putri Nasafa</strong> —  Portfolio 2026
                </div>
                <div style="display: flex; gap: 15px; font-size: 1.2rem;">
                    <a href="https://www.instagram.com/tasyanasyafa/" target="_blank" rel="noopener noreferrer"
                        aria-label="Instagram Tasya" style="color: var(--color-primary-blue);">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/tasya-putri-nasafa-2a53b62b4/?isSelfProfile=true"
                        target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Tasya"
                        style="color: var(--color-primary-blue);">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.tiktok.com/@tasyanasyafaa?_r=1&amp;_t=ZS-9ALsceJtnLq"
                        target="_blank" rel="noopener noreferrer" aria-label="TikTok Tasya"
                        style="color: var(--color-primary-blue);">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>
        </footer>

    </div>

    <!-- Project Detail Modal -->
    <div id="project-modal" class="modal-backdrop">
        <div class="modal-glass-content">
            <button class="modal-close-btn" id="close-modal"><i class="fa-solid fa-xmark"></i></button>
            <span id="modal-category" class="badge-fresh"
                style="margin-bottom: 12px; display: inline-block;">Kategori</span>
            <h2 id="modal-title"
                style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--color-primary-blue); margin-bottom: 20px;">
                Judul Proyek</h2>
            <img id="modal-img" src="" alt="Project Image"
                style="width: 100%; height: 350px; object-fit: cover; border-radius: 18px; margin-bottom: 20px;">
            <p id="modal-description"
                style="font-size: 1.05rem; line-height: 1.7; color: #475569; margin-bottom: 25px;">Deskripsi proyek...
            </p>
            <div style="display: flex; gap: 15px;">
                <a href="#contact" class="btn-fresh-primary"
                    onclick="document.getElementById('project-modal').classList.remove('active');">
                    Tanyakan Proyek Serupa <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>

    <!-- Floating Pop Counter Chip -->
    <div class="chip" aria-live="polite">Gelembung pecah: <b id="score">0</b></div>

    <!-- Certificate Popup (PDF & Gambar) -->
    <div id="cert-popup" onclick="if(event.target===this)this.style.display='none'" style="
        display:none; position:fixed; inset:0; z-index:99999;
        background:rgba(15,23,42,0.75); backdrop-filter:blur(10px);
        align-items:center; justify-content:center; padding:20px;">
        <div style="position:relative; max-width:820px; width:100%; max-height:90vh; pointer-events:auto;">

            <button type="button" onclick="document.getElementById('cert-popup').style.display='none'" style="
                position:absolute; top:-14px; right:-14px; z-index:100000;
                width:40px; height:40px; border-radius:50%; border:none;
                background:#fff; color:#1e293b; font-size:1.1rem;
                cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,0.2);
                display:flex; align-items:center; justify-content:center;">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <!-- Tampilkan PDF -->
            <iframe id="cert-popup-pdf" src="" style="
                width:100%; height:82vh; border:none;
                border-radius:18px; box-shadow:0 25px 60px rgba(0,0,0,0.4);
                background:#fff; display:none;" title="Sertifikat">
            </iframe>

            <!-- Tampilkan Gambar (JPG/PNG) -->
            <img id="cert-popup-img" src="" alt="Sertifikat" style="
                width:100%; max-height:85vh; object-fit:contain;
                border-radius:18px; box-shadow:0 25px 60px rgba(0,0,0,0.4);
                display:none;">

            <!-- Placeholder jika file belum ada -->
            <div id="cert-popup-placeholder" style="
                display:none; background:#fff; border-radius:18px;
                padding:60px 30px; text-align:center; color:#64748b;">
                <i class="fa-solid fa-certificate"
                    style="font-size:3rem; color:#ffde00; opacity:0.7; display:block; margin-bottom:16px;"></i>
                <p style="font-weight:700; font-size:1rem; margin:0 0 8px;">File sertifikat belum tersedia</p>
                <small>Upload PDF/JPG ke <code
                        style="background:#f1f5f9;padding:2px 8px;border-radius:6px;">public/images/certificates/</code></small>
            </div>
        </div>
    </div>

    <script>
        // Safeguard global fallback for openCertificate
        window.openCertificate = function (fileSrc) {
            if (!fileSrc) return;
            var popup = document.getElementById('cert-popup');
            var pdf = document.getElementById('cert-popup-pdf');
            var img = document.getElementById('cert-popup-img');
            var ph = document.getElementById('cert-popup-placeholder');
            if (!popup) return;

            var finalSrc = fileSrc;
            if (!finalSrc.includes('.') && !finalSrc.endsWith('/')) {
                finalSrc += '.pdf';
            }
            var isPdf = finalSrc.toLowerCase().endsWith('.pdf');

            if (pdf) { pdf.style.display = 'none'; pdf.src = ''; }
            if (img) { img.style.display = 'none'; img.src = ''; }
            if (ph) { ph.style.display = 'none'; }

            if (isPdf) {
                if (pdf) {
                    pdf.src = finalSrc;
                    pdf.style.display = 'block';
                }
            } else {
                if (img) {
                    img.style.display = 'block';
                    img.onerror = function () {
                        img.style.display = 'none';
                        if (ph) ph.style.display = 'block';
                    };
                    img.src = finalSrc;
                }
            }
            popup.style.display = 'flex';
        };
    </script>

</body>

</html>