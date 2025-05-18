'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSpam = () => {
    setLoading(true);
    
    // Simple spam detection logic based on common spam keywords
   const spamKeywords = [
    'money', 'cash', 'prize', 'winner', 'offer', 'free', 'discount',
    'urgent', 'limited time', 'act now', 'viagra', 'enlargement',
    'lottery', 'congratulations', 'million', 'dollars', 'investment',
    'bitcoin', 'crypto', 'bank account', 'password', 'verify',
    'claim now', 'exclusive deal', 'fast cash', 'get rich quick',
    'no risk', 'double your money', 'instant access', 'zero fees',
    '100% guaranteed', 'wire transfer', 'secret investment',
    'limited spots', 'unclaimed funds', 'easy money', 'no obligation',
    'click here', 'final notice', 'win big', 'special promotion',
    'gift card', 'free trial', 'no credit check', 'pre-approved'
    ];

    
    // Count how many spam keywords appear in the email
    const lowercaseEmail = email.toLowerCase();
    const matches = spamKeywords.filter(word => 
      lowercaseEmail.includes(word.toLowerCase())
    );
    
    // Calculate spam probability
    const matchCount = matches.length;
    const probability = Math.min(matchCount * 0.15, 0.95);
    
    // Add a bit of randomness for diversity in results
    const randomFactor = Math.random() * 0.2 - 0.1; // -0.1 to 0.1
    const finalProbability = Math.min(Math.max(probability + randomFactor, 0), 1);
    
    // Classify as spam if probability > 0.5
    const isSpam = finalProbability > 0.5;
    const matchedWords = matches.length > 0 ? matches : [];
    
    setTimeout(() => {
      setResult({
        isSpam,
        probability: finalProbability.toFixed(2),
        matchedWords
      });
      setLoading(false);
    }, 500); // Small delay to show loading state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkSpam();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Email Spam Detector</h1>
      
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Content:
            </label>
            <textarea
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Paste your email content here..."
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading || !email.trim()}
            >
              {loading ? 'Analyzing...' : 'Check for Spam'}
            </button>
          </div>
        </form>
        
        {result && (
          <div className={`border ${result.isSpam ? 'border-red-500 bg-red-100' : 'border-green-500 bg-green-100'} rounded p-4 mb-4`}>
            <h2 className="text-xl font-bold mb-2">
              {result.isSpam ? '⚠️ Spam Detected!' : '✅ Not Spam'}
            </h2>
            <p className="mb-2">
              Spam probability: <span className="font-bold">{(result.probability * 100).toFixed(0)}%</span>
            </p>
            
            {result.matchedWords.length > 0 && (
              <div>
                <p className="font-bold">Suspicious keywords found:</p>
                <p className="italic">{result.matchedWords.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}