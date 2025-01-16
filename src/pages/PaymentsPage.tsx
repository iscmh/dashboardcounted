import React, { useState } from 'react';
import { PaymentInfo } from '../types';

export function PaymentsPage() {
  const [paymentType, setPaymentType] = useState<PaymentInfo['type']>('solana');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const paymentInfo: PaymentInfo = {
      type: paymentType,
      name,
      ...(paymentType === 'paypal' ? { email } : { address }),
    };

    try {
      const response = await fetch('https://discord.com/api/webhooks/1329424554895872040/DnQP9DOyVRPasseLiAAIcBJCiibB4Zywxdb_gPaFQphk-G6XMArNSWuEOfGUu6M5P1p0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `New Payment Information Submitted:
Type: ${paymentInfo.type}
Name: ${paymentInfo.name}
${paymentInfo.email ? `Email: ${paymentInfo.email}` : `Address: ${paymentInfo.address}`}`,
        }),
      });

      if (response.ok) {
        setMessage('Payment information submitted successfully!');
        setAddress('');
        setEmail('');
        setName('');
      } else {
        throw new Error('Failed to submit payment information');
      }
    } catch (error) {
      setMessage('Failed to submit payment information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Settings</h1>
      
      <div className="max-w-md bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['solana', 'usdt', 'paypal'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPaymentType(type)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
                    paymentType === type
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {paymentType === 'paypal' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PayPal Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {paymentType.toUpperCase()} Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          )}

          {message && (
            <p className={`text-sm ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Save Payment Information'}
          </button>
        </form>
      </div>
    </div>
  );
}