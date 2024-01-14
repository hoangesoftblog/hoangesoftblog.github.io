import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios';
import PlaceManagementSection from '../PlaceManagementSection.vue';
import type { Place } from '@/models';

vi.mock("axios");

describe('PlaceManagementSection.vue', () => {
  const mockGetResponse = {
    data: {
      data: [
        {
          _id: '1',
          name: 'Test Place',
          category: 'Test Category',
          address: {
            street: 'Test Street',
            city: 'Test City',
            district: 'Test District'
          },
          location: {
            type: 'Point',
            coordinates: [0, 0]
          },
          openingHours: {
            start: '09:00',
            end: '17:00'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as Place[],
      hasNext: true
    }
  };

  beforeEach(() => {
    vi.mocked(axios.get).mockReset();
    vi.mocked(axios.post).mockReset();

    vi.mocked(axios.get).mockResolvedValue(mockGetResponse);
  });

  test('renders properly', () => {
    const wrapper = mount(PlaceManagementSection, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Places Management');
    // console.log(wrapper.html());
  });

  test('initializes data correctly', () => {
    const wrapper = mount(PlaceManagementSection);

    expect(wrapper.vm.places).toEqual([]);
    expect(wrapper.vm.limit).toBe(5);
    expect(wrapper.vm.page).toBe(1);
    expect(wrapper.vm.hasNext).toBe(true);
    expect(wrapper.vm.formMode).toBe("");
    expect(wrapper.vm.placeToEdit).toBe(undefined);
  });

  test('fetches places correctly', async () => {
    const wrapper = mount(PlaceManagementSection);
    // await wrapper.vm.$nextTick();
    await new Promise(r => setTimeout(r, 1000));

    expect(axios.get)
      .toHaveBeenCalledWith(`http://localhost:5172/places?${new URLSearchParams({page: 1 as any as string, limit: 5 as any as string})}`);
    expect(axios.get).toHaveBeenCalledOnce();
    expect(wrapper.vm.places).toEqual(mockGetResponse.data.data);
    expect(wrapper.vm.hasNext).toBe(mockGetResponse.data.hasNext);
  });

  test('editPlace - formMode set to "edit" and sets placeToEdit correctly', async () => {
    const wrapper = mount(PlaceManagementSection);
    const place = mockGetResponse.data.data[0];
    console.log("Test place is:", place);

    await new Promise(r => setTimeout(r, 1000));
    await wrapper.vm.editBtnClick(place);

    expect(wrapper.vm.formMode).toBe('edit')
    expect(wrapper.vm.placeToEdit).toEqual(place);
  });

  

})