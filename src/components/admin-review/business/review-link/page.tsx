"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Edit, Mountain, Star, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "@/components/admin-reviewfile/sidebar"
import ConfirmDialog from "@/components/admin-reviewfile/confirm-dialog"

export default function ReviewLinkPage() {
  // State for review link settings
  const [reviewLinkUrl, setReviewLinkUrl] = useState("https://go.reviewhut.com/doner-hut")
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const [tempUrl, setTempUrl] = useState(reviewLinkUrl)

  // State for social preview
  const [socialPreviewTitle, setSocialPreviewTitle] = useState("Do you want to leave us a review?")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(socialPreviewTitle)

  // State for review gating
  const [isReviewGatingEnabled, setIsReviewGatingEnabled] = useState(true)
  const [showGatingConfirm, setShowGatingConfirm] = useState(false)

  // State for desktop preview customization
  const [businessName, setBusinessName] = useState("DONER HUT")
  const [previewText, setPreviewText] = useState("How was your experience with Doner Hut?")
  const [isEditingPreview, setIsEditingPreview] = useState(false)
  const [tempBusinessName, setTempBusinessName] = useState(businessName)
  const [tempPreviewText, setTempPreviewText] = useState(previewText)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle URL edit
  const handleUrlEdit = () => {
    if (isEditingUrl) {
      setReviewLinkUrl(tempUrl)
    }
    setIsEditingUrl(!isEditingUrl)
  }

  // Handle title edit
  const handleTitleEdit = () => {
    if (isEditingTitle) {
      setSocialPreviewTitle(tempTitle)
    }
    setIsEditingTitle(!isEditingTitle)
  }

  // Handle preview edit
  const handlePreviewEdit = () => {
    if (isEditingPreview) {
      setBusinessName(tempBusinessName)
      setPreviewText(tempPreviewText)
    }
    setIsEditingPreview(!isEditingPreview)
  }

  // Generate a new review link (simulated)
  const generateNewLink = () => {
    const randomString = Math.random().toString(36).substring(2, 8)
    const newLink = `https://go.reviewhut.com/${randomString}`
    setReviewLinkUrl(newLink)
    setTempUrl(newLink)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Handle review submission based on rating
  const handleLeaveReview = () => {
    if (isReviewGatingEnabled) {
      if (rating > 3) {
        // Redirect to review link for positive reviews
        window.open(reviewLinkUrl, "_blank")
      } else {
        // Redirect to home page for negative reviews
        window.location.href = "/"
      }
    } else {
      // If review gating is disabled, always go to review link
      window.open(reviewLinkUrl, "_blank")
    }
  }

  // Toggle review gating with confirmation
  const handleToggleReviewGating = () => {
    if (isReviewGatingEnabled) {
      setShowGatingConfirm(true)
    } else {
      setIsReviewGatingEnabled(true)
    }
  }

  // Confirm disabling review gating
  const confirmDisableGating = () => {
    setIsReviewGatingEnabled(false)
    setShowGatingConfirm(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={false} />

      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Review Link</h1>
          <p className="text-muted-foreground mb-8">
            Customize the behavior, text, and images of your Review Link. If only one integration is active, customers
            will be sent directly to the review site, skipping the "Positive Experience" page.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Review Link URL */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Edit Review Link URL</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUrlEdit}
                      aria-label={isEditingUrl ? "Save URL" : "Edit URL"}
                    >
                      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                      {isEditingUrl ? "Save" : "Edit"}
                    </Button>
                  </div>
                  <CardDescription>This is the URL you'll share with customers to collect reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingUrl ? (
                    <div className="space-y-4">
                      <Input
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        aria-label="Review link URL"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateNewLink}
                        aria-label="Generate new review link"
                      >
                        Generate New Link
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-muted p-3 rounded">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{reviewLinkUrl}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={reviewLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Test review link in new window"
                        >
                          Test Link
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Preview Title */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Social Preview Title</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleTitleEdit}
                      aria-label={isEditingTitle ? "Save title" : "Edit title"}
                    >
                      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                      {isEditingTitle ? "Save" : "Edit"}
                    </Button>
                  </div>
                  <CardDescription>This title appears when your review link is shared on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingTitle ? (
                    <Input
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      aria-label="Social preview title"
                    />
                  ) : (
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm font-medium">{socialPreviewTitle}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Review Gating */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Gating (Star Filter)</CardTitle>
                  <CardDescription>
                    When enabled, only customers with positive experiences (4-5 stars) will be directed to leave public
                    reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="review-gating">{isReviewGatingEnabled ? "Enabled" : "Disabled"}</Label>
                      {isReviewGatingEnabled && (
                        <p className="text-sm text-muted-foreground">
                          Negative reviews will be sent to your feedback form instead
                        </p>
                      )}
                    </div>
                    <Switch
                      id="review-gating"
                      checked={isReviewGatingEnabled}
                      onCheckedChange={handleToggleReviewGating}
                      aria-label="Toggle review gating"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Preview Editor */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Preview Editor</CardTitle>
                    <Button
                      variant="outline"
                      onClick={handlePreviewEdit}
                      aria-label={isEditingPreview ? "Save preview" : "Edit preview"}
                    >
                      {isEditingPreview ? "Save Preview" : "Edit Preview"}
                    </Button>
                  </div>
                  <CardDescription>Customize how your review collection page looks to customers</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingPreview ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          value={tempBusinessName}
                          onChange={(e) => setTempBusinessName(e.target.value)}
                          aria-label="Business name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preview-text">Preview Text</Label>
                        <Input
                          id="preview-text"
                          value={tempPreviewText}
                          onChange={(e) => setTempPreviewText(e.target.value)}
                          aria-label="Preview text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-image">Business Image</Label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          aria-label="Upload business image"
                        />
                        <Button variant="outline" onClick={triggerFileInput} aria-label="Upload business image">
                          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Click "Edit Preview" to customize your review collection page
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Desktop Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>How customers will see your review page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-6 border rounded-lg min-h-[500px] flex flex-col">
                      <div className="flex-grow">
                        {previewImage ? (
                          <div className="mb-4">
                            <img
                              src={previewImage || "/placeholder.svg"}
                              alt="Business Preview"
                              className="w-full h-auto max-h-40 object-contain rounded mx-auto"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mountain className="h-8 w-8 text-primary" aria-hidden="true" />
                          </div>
                        )}
                        <h3 className="font-bold text-xl mb-3 text-center">{businessName}</h3>
                        <p className="text-muted-foreground mb-6 text-center">{previewText}</p>

                        {/* Star Rating Display */}
                        <div className="mb-6 text-center">
                          <div className="flex justify-center space-x-1" role="group" aria-label="Rate your experience">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => setRating(star)}
                                aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                                aria-pressed={star <= rating}
                              >
                                {star <= rating ? (
                                  <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                                ) : (
                                  <Star className="h-8 w-8 text-gray-300" aria-hidden="true" />
                                )}
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {rating > 0
                              ? `You selected ${rating} star${rating !== 1 ? "s" : ""}`
                              : "Rate your experience"}
                          </p>
                        </div>
                      </div>

                      <div className="text-center">
                        <Button onClick={handleLeaveReview} disabled={rating === 0} aria-label="Leave review">
                          Leave Review
                        </Button>
                        <p className="text-xs text-muted-foreground mt-3">Powered by ReviewHUT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog for Disabling Review Gating */}
      <ConfirmDialog
        isOpen={showGatingConfirm}
        onClose={() => setShowGatingConfirm(false)}
        onConfirm={confirmDisableGating}
        title="Disable Review Gating"
        description="Are you sure you want to disable review gating? All customers will be directed to leave public reviews regardless of their rating."
        confirmText="Disable"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  )
}
