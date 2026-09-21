import { Component } from 'react'
import type { ReactNode } from 'react'

/** If WebGL fails at runtime the page still works — the CSS backdrop stays. */
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}
