<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class ContactController extends Controller
{
    public function send(Request $request): RedirectResponse
    {
        $contact = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            Mail::to(config('mail.contact_to'))->send(new ContactMessage($contact));
        } catch (TransportExceptionInterface $exception) {
            report($exception);

            return back()
                ->withInput()
                ->with('contact_error', 'Pesan belum dapat dikirim. Silakan coba lagi nanti.');
        }

        return back()->with('contact_status', 'Terima kasih! Pesan Anda berhasil dikirim.');
    }
}
