"use client"

import { ArrowRight, ArrowLeft, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PACKAGE_TYPES } from "../../../constants"

interface PackageDetailsStepProps {
  formData: {
    packageType: string
    weight: number
    length: number
    width: number
    height: number
    description: string
    value: number
    currency: string
    insuranceOptional: boolean
  }
  onInputChange: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
}

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
]

export default function PackageDetailsStep({ formData, onInputChange, onNext, onPrevious }: PackageDetailsStepProps) {
  return (
    <Card className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Package Details</h2>
          <p className="text-sm text-gray-600 mt-1">Provide information about what you're shipping.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-msc-yellow/10 flex items-center justify-center">
          <Package className="w-5 h-5 text-msc-yellow" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PACKAGE TYPE</label>
            <Select
              value={formData.packageType}
              onValueChange={(value) => onInputChange('packageType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                {PACKAGE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WEIGHT (KG)</label>
            <Input
              type="number"
              placeholder="0.0"
              value={formData.weight.toString()}
              onChange={(e) => onInputChange('weight', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LENGTH (CM)</label>
            <Input
              type="number"
              placeholder="0"
              value={formData.length.toString()}
              onChange={(e) => onInputChange('length', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WIDTH (CM)</label>
            <Input
              type="number"
              placeholder="0"
              value={formData.width.toString()}
              onChange={(e) => onInputChange('width', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HEIGHT (CM)</label>
            <Input
              type="number"
              placeholder="0"
              value={formData.height.toString()}
              onChange={(e) => onInputChange('height', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="package-description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            PACKAGE DESCRIPTION <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="package-description"
            placeholder="Describe the contents of your package (required)"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            rows={3}
            required
            aria-required="true"
            aria-invalid={!formData.description.trim()}
            aria-describedby={!formData.description.trim() ? "package-description-error" : undefined}
            className={!formData.description.trim() ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!formData.description.trim() && (
            <p id="package-description-error" className="text-red-500 text-xs mt-1">Package description is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DECLARED VALUE</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.value.toString()}
              onChange={(e) => onInputChange('value', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CURRENCY</label>
            <Select
              value={formData.currency}
              onValueChange={(value) => onInputChange('currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 flex items-center space-x-2">
          <Checkbox
            id="insurance"
            checked={formData.insuranceOptional}
            onCheckedChange={(checked) => onInputChange('insuranceOptional', checked as boolean)}
          />
          <label
            htmlFor="insurance"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Add insurance coverage (recommended for valuable items)
          </label>
        </div>

        <div className="pt-6 flex justify-between">
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={onPrevious}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
            onClick={onNext}
            disabled={!formData.description.trim() || formData.weight <= 0}
          >
            Next: Service & Review
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
