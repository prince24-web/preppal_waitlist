'use client'
import React, { useState } from 'react'
import { User, Mail, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/utils/supabaseClient';

const WaitlistForm = ({ darkMode, cardBg, borderColor, textSecondary }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      setSubmitStatus('error')
      setMessage('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('Waitlist') // Make sure this matches your table name
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        // Handle specific error cases
        if (error.code === '23505') {
          // Unique constraint violation (email already exists)
          setSubmitStatus('error')
          setMessage('This email is already on our waitlist!')
        } else {
          throw error
        }
      } else {
        setSubmitStatus('success')
        setMessage('Successfully joined the waitlist!')
        // Clear form
        setName('')
        setEmail('')
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error)
      setSubmitStatus('error')
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div className={`max-w-md mx-auto mb-8 p-8 ${cardBg} backdrop-blur-sm rounded-3xl shadow-2xl  ${borderColor} animate-fade-in-up`} style={{animationDelay: '0.3s'}}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-0 outline-none ${
              darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
            } focus:ring-2 focus:ring-blue-500 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </div>
        
        <div className="relative">
          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-0 outline-none ${
              darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
            } focus:ring-2 focus:ring-blue-500 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </div>

        {/* Status Message */}
        {submitStatus && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            submitStatus === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {submitStatus === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !email.trim()}
          className="w-full px-8 py-4 bg-gradient-to-r  from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 hover:scale-105 animate-button-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Joining...
            </>
          ) : (
            <>
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
      
      <p className={`text-sm ${textSecondary} mt-4 flex items-center justify-center gap-1`}>
        <Shield className="w-4 h-4" />
        We won&apos;t spam you or share your info
      </p>
    </div>
  )
}

export default WaitlistForm