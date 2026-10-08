<?php

namespace Tests\Feature;

use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    public function test_contact_form_sends_message_to_configured_recipient(): void
    {
        Mail::fake();

        $contact = [
            'name' => 'Afina',
            'email' => 'afina@example.com',
            'message' => 'Saya tertarik bekerja sama.',
        ];

        $response = $this->from('/')->post(route('contact.send'), $contact);

        $response->assertRedirect('/');
        $response->assertSessionHas('contact_status');
        Mail::assertSent(ContactMessage::class, function (ContactMessage $mail) use ($contact) {
            $mail->build();

            return $mail->hasTo('tasyaputrinasafa@gmail.com')
                && $mail->contact === $contact
                && $mail->hasReplyTo($contact['email']);
        });
    }

    public function test_contact_form_rejects_invalid_input_without_sending_email(): void
    {
        Mail::fake();

        $response = $this->from('/')->post(route('contact.send'), [
            'name' => '',
            'email' => 'not-an-email',
            'message' => '',
        ]);

        $response->assertRedirect('/');
        $response->assertSessionHasErrors(['name', 'email', 'message']);
        Mail::assertNothingSent();
    }
}
