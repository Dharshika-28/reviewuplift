"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import {
  BarChart3,
  Settings,
  Star,
  LinkIcon,
  Users,
  Building,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  isAdmin?: boolean
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const location = useLocation()
  const pathname = location.pathname
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Businesses", href: "/admin/businesses", icon: Building },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings }, // Add settings component
];

 const businessLinks = [
  { name: "Dashboard", href: "/business/dashboard", icon: BarChart3 },
  { name: "Reviews", href: "/business/reviews", icon: Star },
  { name: "Review Link", href: "/business/review-link", icon: LinkIcon },
  { name: "Settings", href: "/business/settings", icon: Settings }, // Add settings component
];

  const links = isAdmin ? adminLinks : businessLinks

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-orange-50 text-orange-900">
      <div className="p-6 border-b border-orange-200">
        <h2 className="text-2xl font-bold text-orange-700">ReviewHUT</h2>
      </div>
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1" aria-label={isAdmin ? "Admin navigation" : "Business navigation"}>
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-100 hover:text-orange-800",
                )}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 mt-auto border-t border-orange-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-white hover:bg-red-500 px-3"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (!mounted) return null

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-40 text-orange-700"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-orange-50 text-orange-900">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-orange-200 bg-orange-50">
        <SidebarContent />
      </div>
    </>
  )
}