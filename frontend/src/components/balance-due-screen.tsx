"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertCircle, CreditCard, ExternalLink, HelpCircle } from "lucide-react"

export default function BalanceDueScreen() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] text-center relative overflow-hidden"
                >
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#003873_1px,transparent_1px)] [background-size:24px_24px]" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-8">
                            <AlertCircle className="w-10 h-10 text-amber-500" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Action Required: <br />
                            <span className="text-amber-500 underline decoration-amber-200 underline-offset-8">Outstanding Balance</span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                            Access to this platform is temporarily restricted. <br />
                            Please settle the outstanding balance to resume full service.
                        </p>

                        <div className="w-full space-y-4">
                            <Button
                                className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
                                onClick={() => window.open('https://pay.stripe.com/example', '_blank')}
                            >
                                <CreditCard className="w-5 h-5" />
                                Settle Balance Now
                            </Button>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 rounded-xl"
                                    onClick={() => window.location.href = 'mailto:accounts@mse-logistics.com'}
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Support
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-12 text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2 rounded-xl"
                                    onClick={() => window.location.reload()}
                                >
                                    Check Status
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <p className="mt-12 text-xs text-slate-400 font-medium">
                            Mediterranean Shipping Express &copy; 2026. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
