"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MSC_COLORS } from "../../../constants"
import { Printer, Download, Image as ImageIcon } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"
import { toast } from "sonner"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export interface ShipmentReceiptProps {
  shipment: {
    id: string
    trackingNumber: string
    status: string
    createdAt: string
    totalCost?: number
    currency: string
    senderName: string
    senderEmail: string
    senderPhone: string
    senderAddress: string
    senderCity: string
    senderCountry: string
    senderPostalCode: string
    recipientName: string
    recipientEmail: string
    recipientPhone: string
    recipientAddress: string
    recipientCity: string
    recipientCountry: string
    recipientPostalCode: string
    packageType: string
    weight: number
    description: string
    serviceType: string
    transportMode: string
    shippingCost: number
    insuranceCost?: number
    estimatedDeliveryDate?: string
    value: number // This is the declared value entered by the user
  }
  isOpen: boolean
  onClose: () => void
}

export default function ShipmentReceipt({ shipment, isOpen, onClose }: ShipmentReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getPackageTypeDisplay = (packageType: string) => {
    switch (packageType) {
      case 'DOCUMENTS': return 'Documents'
      case 'PARCEL': return 'Parcel'
      case 'FRAGILE': return 'Fragile Items'
      case 'ELECTRONICS': return 'Electronics'
      case 'CLOTHING': return 'Clothing'
      case 'FOOD': return 'Food Items'
      case 'HAZARDOUS': return 'Hazardous Materials'
      case 'OTHER': return 'Other'
      default: return packageType
    }
  }

  const trackingUrl = `https://mediterraneanshippingexpress.com/tracking/${shipment.trackingNumber}`

  const handlePrint = async () => {
    if (!receiptRef.current) return

    try {
      toast.info('Preparing print preview...')

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3, // Higher scale for better print quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 320,
        height: receiptRef.current.scrollHeight,
        windowWidth: 320,
        windowHeight: receiptRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector('[data-receipt-container]') as HTMLElement
          if (element) {
            element.style.height = 'auto'
            element.style.maxHeight = 'none'
            element.style.overflow = 'visible'
          }
        }
      })

      const printWindow = window.open('', '_blank')
      if (printWindow) {
        const img = canvas.toDataURL('image/png')
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>MSE Receipt - ${shipment.trackingNumber}</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  background: #f4f4f4;
                }
                img { 
                  width: 100%;
                  max-width: 85mm; /* Standard thermal width */
                  height: auto;
                }
                @media print {
                  body { background: white; padding: 0; }
                  @page { margin: 0; size: auto; }
                  img { max-width: 100%; box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <img src="${img}" alt="Receipt" />
              <script>
                window.onload = function() {
                  setTimeout(() => {
                    window.print();
                    window.close();
                  }, 500);
                }
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    } catch (error) {
      console.error('Error generating print preview:', error)
      toast.error('Failed to generate print preview')
    }
  }

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return

    try {
      toast.info('Generating PDF... Please wait')

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 320,
        height: receiptRef.current.scrollHeight,
        windowWidth: 320,
        windowHeight: receiptRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector('[data-receipt-container]') as HTMLElement
          if (element) {
            element.style.height = 'auto'
            element.style.maxHeight = 'none'
            element.style.overflow = 'visible'
          }
        }
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 80 // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [imgWidth, imgHeight] // Perfectly match content height
      })

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`MSE-Receipt-${shipment.trackingNumber}.pdf`)
      toast.success('PDF downloaded successfully!')

    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    }
  }

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return

    try {
      toast.info('Generating image... Please wait')

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 320,
        height: receiptRef.current.scrollHeight,
        windowWidth: 320,
        windowHeight: receiptRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector('[data-receipt-container]') as HTMLElement
          if (element) {
            element.style.height = 'auto'
            element.style.maxHeight = 'none'
            element.style.overflow = 'visible'
          }
        }
      })

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `MSE-Receipt-${shipment.trackingNumber}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          toast.success('Image downloaded successfully!')
        }
      }, 'image/png', 1.0)

    } catch (error) {
      console.error('Error generating image:', error)
      toast.error('Failed to generate image')
    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-sm">Receipt - {shipment.trackingNumber}</DialogTitle>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex gap-1 mb-2 px-4 no-print">
          <Button onClick={handlePrint} variant="default" size="sm" className="flex items-center gap-1 text-xs">
            <Printer className="w-3 h-3" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            <Download className="w-3 h-3" />
            PDF
          </Button>
          <Button onClick={handleDownloadImage} variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            <ImageIcon className="w-3 h-3" />
            Image
          </Button>
        </div>

        {/* Receipt Content */}
        <div
          ref={receiptRef}
          data-receipt-container
          className="relative text-black font-sans"
          style={{
            // Premium gradient background
            background: `linear-gradient(135deg, #fffbeb 0%, ${MSC_COLORS.YELLOW}15 50%, ${MSC_COLORS.GOLD}30 100%)`,
            width: '320px',
            margin: '0 auto',
            position: 'relative',
            minHeight: 'fit-content'
          }}
        >
          {/* Watermark Background */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ opacity: 0.03 }}
          >
            <h1 className="text-9xl font-black transform -rotate-45">MSE</h1>
          </div>

          <div className="relative z-10 p-6 flex flex-col gap-5">

            {/* Header Section */}
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-2">
                {/* Logo without background/invert for better compatibility */}
                <div className="relative w-16 h-16">
                  <Image
                    src="/mse-logo.png"
                    alt="MSE Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight leading-none uppercase text-neutral-900">
                  Mediterranean Shipping<br />Express
                </h1>
                <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mt-2">
                  Official Thermal Courier Receipt
                </p>
              </div>
            </div>

            {/* Receipt Meta & Paid Stamp */}
            <div className="relative flex justify-between items-end border-b-2 border-dashed border-neutral-300 pb-4">
              <div className="space-y-1 relative z-10">
                <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Receipt No.</p>
                <p className="text-sm font-black text-black">MSE-{shipment.id.substring(0, 8).toUpperCase()}</p>
              </div>
              <div className="text-right space-y-1 relative z-10">
                <p className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Date Issued</p>
                <p className="text-sm font-black text-black">{formatDate(new Date().toISOString())}</p>
              </div>

              {/* PAID Stamp - Repositioned to avoid covering Tracking Number */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 transform -rotate-12 border-[3px] rounded-lg px-2 py-0.5 pointer-events-none z-0 mix-blend-multiply"
                style={{
                  borderColor: '#ca8a04', // Darker golden/orange
                  color: '#ca8a04',
                  opacity: 0.15,
                  right: '10%'
                }}
              >
                <span className="text-4xl font-black uppercase tracking-widest opacity-80">PAID</span>
              </div>
            </div>

            {/* Tracking Card */}
            <div className="relative bg-white rounded-xl shadow-sm border border-neutral-100 p-5 text-center mt-2">
              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-2">
                Tracking Number
              </p>
              <p className="text-2xl font-black text-neutral-900 mb-4 tracking-tighter">
                {shipment.trackingNumber}
              </p>
              <div className="flex justify-center">
                {/* QR Code */}
                <div className="p-1">
                  <QRCodeSVG
                    value={trackingUrl}
                    size={100}
                    level="H"
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>
              </div>
            </div>

            {/* Sender / Receiver */}
            <div className="grid grid-cols-2 gap-4 text-xs relative mt-1">
              <div className="space-y-2">
                <h3 className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-200 pb-1 text-left">Sender</h3>
                <div className="text-left">
                  <p className="font-bold text-neutral-900 text-xs leading-tight">{shipment.senderName}</p>
                  <div className="text-neutral-600 mt-1 leading-relaxed text-[10px] font-medium">
                    <p>{shipment.senderCity}, {shipment.senderCountry}</p>
                    <p className="mt-0.5 opacity-80">{shipment.senderPhone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 relative">
                <h3 className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-200 pb-1 text-left pl-3">Receiver</h3>
                <div className="pl-3 text-left">
                  <p className="font-bold text-neutral-900 text-xs leading-tight">{shipment.recipientName}</p>
                  <div className="text-neutral-600 mt-1 leading-relaxed text-[10px] font-medium">
                    <p>{shipment.recipientCity}, {shipment.recipientCountry}</p>
                    <p className="mt-0.5 opacity-80">{shipment.recipientPhone}</p>
                  </div>
                </div>
                {/* Vertical Divider */}
                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-neutral-200"></div>
              </div>
            </div>

            {/* Shipment Detail Card */}
            <div className="bg-neutral-50/80 rounded-lg p-3 border border-neutral-200/60 text-left mt-1">
              <div className="grid grid-cols-2 gap-y-3 text-[10px]">
                <div>
                  <span className="block text-neutral-500 font-extrabold uppercase tracking-wider text-[9px] mb-0.5">Estimated Delivery</span>
                  <span className="font-bold text-neutral-900 text-xs">{shipment.estimatedDeliveryDate ? formatDate(shipment.estimatedDeliveryDate) : 'Pending'}</span>
                </div>
                <div>
                  <span className="block text-neutral-500 font-extrabold uppercase tracking-wider text-[9px] mb-0.5">Weight</span>
                  <span className="font-bold text-neutral-900 text-xs">{shipment.weight} kg</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-neutral-200 mt-1 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-neutral-500 font-extrabold uppercase tracking-wider text-[9px] mb-0.5">Type</span>
                    <span className="font-bold text-neutral-900 text-xs">{getPackageTypeDisplay(shipment.packageType)}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-500 font-extrabold uppercase tracking-wider text-[9px] mb-0.5">Content</span>
                    <span className="font-bold text-neutral-900 text-xs truncate block">{shipment.description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount Section */}
            <div className="border-t-2 border-dashed border-neutral-300 pt-4 mt-1">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Total Amount</span>
                <span className="text-xl font-black text-neutral-900">
                  {formatCurrency(shipment.totalCost || 0, shipment.currency)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 pb-2 space-y-1">
              <p className="text-[11px] font-black italic text-neutral-800 tracking-tight">
                Thank you for choosing MSE
              </p>
              <div className="text-[9px] text-neutral-500 font-medium leading-relaxed">
                <p>For support: support@mse-shipping.com</p>
                <p>+234 1 234 5678 • www.mse.express</p>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}