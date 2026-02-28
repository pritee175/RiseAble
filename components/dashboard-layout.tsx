'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  MessageSquare,
  Users,
  FileText,
  User,
  Search,
  Bell,
  Menu,
  Settings,
  Accessibility,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessibility } from '@/hooks/use-accessibility'
import { useApplyAccessibilitySettings } from '@/hooks/use-apply-accessibility'
import { useVoiceNavigation } from '@/hooks/use-voice-navigation'
import { useKeyboardDetection } from '@/hooks/use-keyboard-detection'
import VoiceIndicator from '@/components/ui/voice-indicator'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Chatbot', href: '/dashboard/chatbot', icon: MessageSquare },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Government Schemes', href: '/dashboard/schemes', icon: FileText },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Fetch accessibility settings from backend
  const { settings: accessibilitySettings, updateSetting, isLoading, error } = useAccessibility()
  
  // Apply settings globally to document
  useApplyAccessibilitySettings(accessibilitySettings)
  // Start voice navigation service when enabled and receive listening state
  const isListening = useVoiceNavigation(accessibilitySettings.voiceNavigation)
  // Enable transient keyboard outlines when user presses Tab (or force via setting)
  useKeyboardDetection(accessibilitySettings.keyboardNav)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="w-full flex items-center justify-between px-6 py-3">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 items-center border-b border-border px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
                      <Accessibility className="h-5 w-5 text-primary" />
                      <span>RiseAble</span>
                    </Link>
                  </div>
                  <nav className="flex-1 space-y-1 p-4">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <Accessibility className="h-5 w-5 text-primary" />
              <span>RiseAble</span>
            </Link>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 flex justify-center px-6">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, jobs..."
                className="w-full pl-10 bg-background"
              />
            </div>
          </div>

          {/* Right Section - Icons & Profile */}
          <div className="flex items-center gap-6">
            {/* Accessibility Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Accessibility className="h-4 w-4 mr-2" />
                  Accessibility Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Accessibility Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-3 p-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-nav" className="text-sm cursor-pointer">
                      Voice Navigation
                    </Label>
                    <Switch
                      id="voice-nav"
                      checked={accessibilitySettings.voiceNavigation}
                      onCheckedChange={(checked) =>
                        updateSetting('voiceNavigation', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="screen-reader" className="text-sm cursor-pointer">
                      Screen Reader Mode
                    </Label>
                    <Switch
                      id="screen-reader"
                      checked={accessibilitySettings.screenReader}
                      onCheckedChange={(checked) =>
                        updateSetting('screenReader', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="text-sm cursor-pointer">
                      High Contrast Mode
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={accessibilitySettings.highContrast}
                      onCheckedChange={(checked) =>
                        updateSetting('highContrast', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-text" className="text-sm cursor-pointer">
                      Large Text
                    </Label>
                    <Switch
                      id="large-text"
                      checked={accessibilitySettings.largeText}
                      onCheckedChange={(checked) =>
                        updateSetting('largeText', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="keyboard-nav" className="text-sm cursor-pointer">
                      Keyboard Navigation
                    </Label>
                    <Switch
                      id="keyboard-nav"
                      checked={accessibilitySettings.keyboardNav}
                      onCheckedChange={(checked) =>
                        updateSetting('keyboardNav', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Voice listening indicator */}
            <div className="hidden sm:flex items-center">
              <VoiceIndicator isListening={isListening} />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-2 p-2">
                  <div className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium">New course available</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check out "Web Development Basics" in Digital Skills
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium">Job application update</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your application for Junior Developer was viewed
                    </p>
                  </div>
                  <div className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium">New message in Community</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sarah replied to your post in Success Stories
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
