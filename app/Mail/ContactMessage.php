<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public array $contact)
    {
    }

    public function build(): self
    {
        return $this
            ->replyTo($this->contact['email'], $this->contact['name'])
            ->subject('Pesan baru dari formulir portofolio')
            ->view('emails.contact');
    }
}
