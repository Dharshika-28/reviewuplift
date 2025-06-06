"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User, UserRole } from "@/lib/types"
import { businessesData } from "@/lib/data"

interface CreateUserFormProps {
  isOpen: boolean
  onClose: () => void
  onCreateUser: (user: Partial<User>) => void
}

export default function CreateUserForm({ isOpen, onClose, onCreateUser }: CreateUserFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [businessId, setBusinessId] = useState<string>("")
  const [role, setRole] = useState<UserRole>("staff")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!businessId) {
      newErrors.business = "Business is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Find the selected business
    const selectedBusiness = businessesData.find((b) => b.id.toString() === businessId)

    // Simulate API call
    setTimeout(() => {
      const newUser: Partial<User> = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email: email,
        business: selectedBusiness?.name,
        businessId: selectedBusiness?.id,
        role: role,
        status: "active",
        lastLogin: "Never",
      }

      onCreateUser(newUser)
      setIsSubmitting(false)
      resetForm()
      onClose()
    }, 1000)
  }

  const resetForm = () => {
    setFullName("")
    setEmail("")
    setBusinessId("")
    setRole("staff")
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account and assign them to a business.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full-name" className="required">
              Full Name
            </Label>
            <Input
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "full-name-error" : undefined}
            />
            {errors.name && (
              <p id="full-name-error" className="text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="required">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business" className="required">
              Business
            </Label>
            <Select value={businessId} onValueChange={setBusinessId}>
              <SelectTrigger
                id="business"
                aria-required="true"
                aria-invalid={!!errors.business}
                aria-describedby={errors.business ? "business-error" : undefined}
              >
                <SelectValue placeholder="Select a business" />
              </SelectTrigger>
              <SelectContent>
                {businessesData
                  .filter((business) => business.status === "active")
                  .map((business) => (
                    <SelectItem key={business.id} value={business.id.toString()}>
                      {business.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.business && (
              <p id="business-error" className="text-sm text-red-500">
                {errors.business}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" style={{backgroundColor:'black'}}  disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
