import { describe, expect, it } from 'vitest'
import { sum } from '../src/utils/index'

describe('sum', () => {
  it('should sum of 2 and 2 equals to 4', () => {
    expect(sum(2, 2)).toEqual(4)
  })
})
