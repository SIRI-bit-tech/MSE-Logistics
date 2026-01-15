"use client"

import { Card, Input, Button, Select, SelectItem, Textarea, Checkbox } from "@nextui-org/react"
import { ArrowRight, ArrowLeft, Package } from "lucide-react"
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
              placeholder="Select package type"
              selectedKeys={formData.packageType ? [formData.packageType] : []}
              onSelectionChange={(keys) => {
                if (keys !== "all") {
                  const value = keys.size > 0 ? (Array.from(keys)[0] as string) : ''
                  onInputChange('packageType', value)
                }
              }}
              classNames={{
                trigger: "bg-white border-gray-200",
                value: "text-gray-900",
                popoverContent: "bg-white"
              }}
            >
              {PACKAGE_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WEIGHT (KG)</label>
            <Input
              type="number"
              placeholder="0.0"
              value={formData.weight.toString()}
              onValueChange={(value) => onInputChange('weight', parseFloat(value) || 0)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
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
              onValueChange={(value) => onInputChange('length', parseFloat(value) || 0)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WIDTH (CM)</label>
            <Input
              type="number"
              placeholder="0"
              value={formData.width.toString()}
              onValueChange={(value) => onInputChange('width', parseFloat(value) || 0)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">HEIGHT (CM)</label>
            <Input
              type="number"
              placeholder="0"
              value={formData.height.toString()}
              onValueChange={(value) => onInputChange('height', parseFloat(value) || 0)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PACKAGE DESCRIPTION</label>
          <Textarea
            placeholder="Describe the contents of your package"
            value={formData.description}
            onValueChange={(value) => onInputChange('description', value)}
            minRows={3}
            classNames={{
              input: "text-gray-900",
              inputWrapper: "bg-white border-gray-200 shadow-none",
              base: "shadow-none"
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DECLARED VALUE</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.value.toString()}
              onValueChange={(value) => onInputChange('value', parseFloat(value) || 0)}
              classNames={{
                input: "text-gray-900",
                inputWrapper: "bg-white border-gray-200"
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CURRENCY</label>
            <Select
              placeholder="Select currency"
              selectedKeys={formData.currency ? [formData.currency] : []}
              onSelectionChange={(keys) => {
                if (keys !== "all") {
                  const value = keys.size > 0 ? (Array.from(keys)[0] as string) : ''
                  onInputChange('currency', value)
                }
              }}
              classNames={{
                trigger: "bg-white border-gray-200",
                value: "text-gray-900",
                popoverContent: "bg-white"
              }}
            >
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Checkbox
            isSelected={formData.insuranceOptional}
            onValueChange={(checked) => onInputChange('insuranceOptional', checked)}
            classNames={{
              label: "text-sm text-gray-700"
            }}
          >
            Add insurance coverage (recommended for valuable items)
          </Checkbox>
        </div>

        <div className="pt-6 flex justify-between">
          <Button
            size="lg"
            variant="bordered"
            className="px-8"
            startContent={<ArrowLeft className="w-5 h-5" />}
            onPress={onPrevious}
          >
            Previous
          </Button>
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8"
            endContent={<ArrowRight className="w-5 h-5" />}
            onPress={onNext}
          >
            Next: Service & Review
          </Button>
        </div>
      </div>
    </Card>
  )
}
