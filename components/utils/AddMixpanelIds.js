import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AddMixpanelIds() {
  const { asPath } = useRouter()
  const [mpId, setMpId] = useState(false)

  useEffect(() => {
    const mixpanelLoadInterval = setInterval(() => {
      if (window.mixpanel_is_loaded) {
        setMpId(window.mixpanel.get_distinct_id())
        clearInterval(mixpanelLoadInterval)
      }
    }, 100)

    return () => clearInterval(mixpanelLoadInterval)
  }, [])

  useEffect(() => {
    if (mpId) {
      const anchors = document.querySelectorAll('a')

      anchors.forEach(anchor => {
        if (anchor.href.includes('moovweb.app')) {
          const url = new URL(anchor.href)
          url.searchParams.append('mpId', mpId)

          anchor.href = url.toString()
        }
      })
    }
  }, [mpId, asPath])
}
