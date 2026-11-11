const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const context = { exports: {}, Intl, Date }
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/dashboard-events.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context)
const { isCurrentEvent, coloradoToday } = context.exports
 test('Colorado day boundary retains today until local midnight', () => {
  const before = new Date('2026-11-11T06:59:59Z')
  const after = new Date('2026-11-11T07:00:00Z')
  assert.equal(coloradoToday(before), '2026-11-10')
  assert.equal(isCurrentEvent({event_date:'2026-11-10'},before),true)
  assert.equal(isCurrentEvent({event_date:'2026-11-10'},after),false)
 })
 test('past and cancelled events stay out while imported and legacy current events remain', () => {
  const now = new Date('2026-07-15T18:00:00Z')
  assert.equal(isCurrentEvent({event_date:'2026-07-14'},now),false)
  assert.equal(isCurrentEvent({event_date:'2026-07-15',event_status:'imported'},now),true)
  assert.equal(isCurrentEvent({event_date:'2027-01-01',event_status:'cancelled'},now),false)
  assert.equal(isCurrentEvent({event_date:'2027-01-01',event_status:null},now),true)
  assert.equal(isCurrentEvent({event_date:''},now),false)
 })
 test('filtering leaves the stored event and financial fields untouched', () => {
  const event = Object.freeze({event_date:'2020-01-01',event_status:'confirmed',deposit_paid:true,deposit_amount:500,balance_due:700})
  assert.equal(isCurrentEvent(event,new Date('2026-11-10T18:00:00Z')),false)
  assert.equal(event.deposit_amount,500)
  assert.equal(event.event_status,'confirmed')
 })
