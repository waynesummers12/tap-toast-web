"use client"

import { useEffect } from "react"

const BOOKING_CID_KEY = "tap_toast_booking_cid"

export default function ClearBookingCid() {
  useEffect(() => {
    localStorage.removeItem(BOOKING_CID_KEY)
  }, [])

  return null
}