"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Sidebar from "@/components/sidebar"
import ConfirmDialog from "@/components/confirm-dialog"
import { businessesData } from "@/lib/data"
import type { Business, BusinessStatus } from "@/lib/types"

export default function EditBusinessPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [business, setBusiness] = useState<Business | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showDiscardChanges, setShowDiscardChanges] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<BusinessStatus>("active")
  const [isReviewGatingEnabled, setIsReviewGatingEnabled] = useState(true)

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate API call to fetch business details
    const fetchData = () => {
      setIsLoading(true)

      // Find business by ID
      const foundBusiness = businessesData.find((b) => b.id === Number.parseInt(params.id))

      if (foundBusiness) {
        setBusiness(foundBusiness)

        // Initialize form with business data
        setName(foundBusiness.name)
        setEmail(`contact@${foundBusiness.name.toLowerCase().replace(/\s+/g, "")}.com`)
        setPhone("+1 (555) 123-4567")
        setAddress("123 Business St, City, State 12345")
        setDescription("A business description would go here.")
        setStatus(foundBusiness.status)
        setIsReviewGatingEnabled(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [params.id])

  // Check for changes in form
  useEffect(() => {
    if (!business) return

    const hasFormChanges =
      name !== business.name ||
      status !== business.status ||
      email !== `contact@${business.name.toLowerCase().replace(/\s+/g, "")}.com` ||
      phone !== "+1 (555) 123-4567" ||
      address !== "123 Business St, City, State 12345" ||
      description !== "A business description would go here."

    setHasChanges(hasFormChanges)
  }, [business, name, email, phone, address, description, status])

  // Handle back button click
  const handleBack = () => {
    if (hasChanges) {
      setShowDiscardChanges(true)
    } else {
      router.back()
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Business name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSaving(true)

    // Simulate API call to update business
    setTimeout(() => {
      // In a real app, this would be an API call
      const updatedBusiness = {
        ...business!,
        name,
        status,
      }

      // Update local state
      setBusiness(updatedBusiness)
      setIsSaving(false)
      setHasChanges(false)

      // Navigate back to business details
      router.push(`/admin/businesses/${params.id}`)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isAdmin={true} />
        <div className="flex-1 md:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-center py-12">Loading business details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isAdmin={true} />
        <div className="flex-1 md:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Business Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The business you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => router.push("/admin/businesses")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Businesses
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={true} />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={handleBack} className="mb-4" aria-label="Back to business details">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Business Details
            </Button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Edit Business</h1>
                <p className="text-muted-foreground">Update information for {business.name}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update the business details and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name" className="required">
                    Business Name
                  </Label>
                  <Input
                    id="business-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter business name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "business-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="business-name-error" className="text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-email" className="required">
                    Business Email
                  </Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@business.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "business-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="business-email-error" className="text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-phone" className="required">
                    Business Phone
                  </Label>
                  <Input
                    id="business-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "business-phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="business-phone-error" className="text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-address" className="required">
                    Business Address
                  </Label>
                  <Input
                    id="business-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Business St, City, State 12345"
                    aria-required="true"
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "business-address-error" : undefined}
                  />
                  {errors.address && (
                    <p id="business-address-error" className="text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the business"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-status">Business Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as BusinessStatus)}>
                    <SelectTrigger id="business-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="review-gating">Review Gating</Label>
                    <p className="text-sm text-muted-foreground">
                      {isReviewGatingEnabled
                        ? "Only positive reviews (4-5 stars) will be directed to public review sites"
                        : "All reviews will be directed to public review sites"}
                    </p>
                  </div>
                  <Switch
                    id="review-gating"
                    checked={isReviewGatingEnabled}
                    onCheckedChange={setIsReviewGatingEnabled}
                    aria-label="Toggle review gating"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleBack} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving || !hasChanges}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>

      {/* Discard Changes Confirmation */}
      <ConfirmDialog
        isOpen={showDiscardChanges}
        onClose={() => setShowDiscardChanges(false)}
        onConfirm={() => {
          setShowDiscardChanges(false)
          router.back()
        }}
        title="Discard Changes"
        description="You have unsaved changes. Are you sure you want to discard them?"
        confirmText="Discard"
        cancelText="Continue Editing"
        variant="destructive"
      />
    </div>
  )
}
