import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlaceManagementSection from '../PlaceManagementSection.vue'


describe('HelloWorld', () => {
    it('renders properly', () => {
      const wrapper = mount(PlaceManagementSection, { props: { msg: 'Hello Vitest' } })
      expect(wrapper.text()).toContain('Places Management');
      console.log(wrapper.html());
    })
  })