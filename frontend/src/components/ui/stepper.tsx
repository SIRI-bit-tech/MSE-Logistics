"use client"

import { Check } from "lucide-react"

interface StepperStep {
  id: number
  title: string
  description: string
  completed: boolean
  active: boolean
}

interface StepperProps {
  steps: StepperStep[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${step.completed 
                  ? 'bg-green-500 text-white' 
                  : step.active 
                    ? 'bg-msc-yellow text-black' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {step.completed ? (
                <Check className="w-5 h-5" />
              ) : (
                step.id
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-sm font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                STEP {step.id}
              </div>
              <div className={`text-sm ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.title}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-200 mx-4 mt-[-20px]" />
          )}
        </div>
      ))}
    </div>
  )
}