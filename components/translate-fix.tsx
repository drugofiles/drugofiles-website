'use client'

import { useEffect } from 'react'

// This component patches DOM methods to prevent React crashes
// when Google Translate modifies the DOM
export function TranslateFix() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Patch removeChild to handle Google Translate modifications
    const originalRemoveChild = Node.prototype.removeChild
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        if (console && console.warn) {
          console.warn('Cannot remove child: not a child of this node', child, this)
        }
        return child
      }
      return originalRemoveChild.apply(this, [child]) as T
    }

    // Patch insertBefore to handle Google Translate modifications
    const originalInsertBefore = Node.prototype.insertBefore
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (console && console.warn) {
          console.warn('Cannot insert before: reference node is not a child', referenceNode, this)
        }
        return newNode
      }
      return originalInsertBefore.apply(this, [newNode, referenceNode]) as T
    }

    // Cleanup on unmount
    return () => {
      Node.prototype.removeChild = originalRemoveChild
      Node.prototype.insertBefore = originalInsertBefore
    }
  }, [])

  return null
}
