'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Send, Bot, User } from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hello! I'm your RiseAble AI assistant. I'm here to help you with course recommendations, job search tips, accessibility features, and government schemes. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  const quickPrompts = [
    'Recommend courses for me',
    'How do I apply for jobs?',
    'What accessibility features are available?',
    'Tell me about government schemes',
    'How do I improve my resume?',
    'Tips for job interviews',
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('course') || lowerQuery.includes('learn')) {
      return "Based on your profile, I recommend starting with our 'Web Development Basics' course. It's beginner-friendly and includes accessible video lessons with captions. You can also explore 'Data Entry Professional' if you prefer working with structured data. Would you like more details about any specific course?"
    }

    if (lowerQuery.includes('job') || lowerQuery.includes('apply')) {
      return "To apply for jobs on RiseAble, visit the Jobs section and browse opportunities that match your skills. Each listing includes accessibility information. I recommend updating your profile with your latest skills and certifications to increase your chances. Would you like tips on writing a strong application?"
    }

    if (lowerQuery.includes('accessibility') || lowerQuery.includes('feature')) {
      return "RiseAble offers several accessibility features: voice navigation, screen reader compatibility, high contrast mode, large text options, and keyboard navigation. You can customize these in the accessibility menu (the accessibility icon in the top navigation). Which feature would you like help enabling?"
    }

    if (lowerQuery.includes('scheme') || lowerQuery.includes('government') || lowerQuery.includes('benefit')) {
      return "We have curated information about government schemes for specially-abled individuals, including disability benefits, skill development programs, and employment assistance. Visit the Government Schemes section to explore schemes based on your location and eligibility. Would you like help finding schemes specific to your region?"
    }

    if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
      return "Here are key tips for your resume: 1) Highlight your skills and certifications from RiseAble courses, 2) Include specific achievements and projects, 3) Keep it concise and well-formatted, 4) Mention any accessibility tools you're proficient with, 5) Tailor it to each job application. Would you like me to review your resume or provide templates?"
    }

    if (lowerQuery.includes('interview')) {
      return "Interview tips: 1) Research the company and role beforehand, 2) Prepare answers for common questions, 3) Practice with mock interviews in our Communication Skills course, 4) Inform the employer of any accessibility needs in advance, 5) Prepare thoughtful questions to ask the interviewer. Would you like to do a practice interview session?"
    }

    return "I'm here to help with courses, jobs, accessibility features, and government schemes. Could you please provide more details about what you'd like to know? You can also try one of the quick prompts below for common topics."
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-12rem)]">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get instant help with courses, jobs, accessibility, and more
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="flex-1 flex flex-col h-[calc(100%-8rem)]">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' ? 'bg-primary' : 'bg-primary/10'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">Quick prompts to get started:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
