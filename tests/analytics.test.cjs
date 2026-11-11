const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = ts.transpileModule(fs.readFileSync('src/lib/analytics.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText
function setup() {
  const calls = [], storage = new Map()
  const window = { location: { pathname: '/book' }, localStorage: {
    getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)
  }, gtag: (...args) => calls.push(args) }
  const context = { exports: {}, window, URL }
  vm.runInNewContext(source, context)
  return { ...context.exports, window, calls }
}
test('all booking URL variants count, without sending query data', () => {
  const { classifyLink } = setup()
  for (const path of ['/book', '/book/', '/book?service=soda', '/book?tier=signature', '/book?cid=private&email=private']) {
    const event = classifyLink(path, 'https://www.coloradotapandtoast.com')
    assert.equal(event.name, 'book_click')
    assert.ok(!JSON.stringify(event).includes('private'))
  }
  assert.equal(classifyLink('https://other.example/book', 'https://www.coloradotapandtoast.com'), null)
  assert.equal(classifyLink('/bookings', 'https://www.coloradotapandtoast.com'), null)
})
test('contact actions are not submitted leads', () => {
  const { classifyLink } = setup()
  assert.equal(classifyLink('mailto:private@example.com', 'https://example.com').name, 'contact_click')
  assert.equal(classifyLink('tel:123456789', 'https://example.com').parameters.contact_method, 'phone')
})
test('deduplicates accepted leads and payments but separates payment types', () => {
  const { trackEvent, calls } = setup()
  trackEvent('generate_lead', {}, 'event-1')
  trackEvent('generate_lead', {}, 'event-1')
  trackEvent('payment_confirmed', { payment_type: 'deposit' }, 'event-1:deposit')
  trackEvent('payment_confirmed', { payment_type: 'deposit' }, 'event-1:deposit')
  trackEvent('payment_confirmed', { payment_type: 'balance' }, 'event-1:balance')
  assert.equal(calls.length, 3)
})
test('private routes are excluded, storage failure and late scripts do not break tracking', () => {
  const { trackEvent, window, calls } = setup()
  for (const path of ['/admin', '/admin/login', '/dashboard', '/dashboard/events']) {
    window.location.pathname = path
    trackEvent('book_click')
  }
  assert.equal(calls.length, 0)
  window.location.pathname = '/book'
  window.localStorage.getItem = () => { throw Error('blocked') }
  window.localStorage.setItem = () => { throw Error('blocked') }
  delete window.gtag
  trackEvent('generate_lead', {}, 'event-1')
  trackEvent('generate_lead', {}, 'event-1')
  assert.equal(window.dataLayer.length, 1)
})
