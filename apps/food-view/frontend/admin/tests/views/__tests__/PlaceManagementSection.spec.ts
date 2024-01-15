import { describe, expect, test, vi, beforeEach } from 'vitest'
import { mount, VueWrapper as Wrapper} from '@vue/test-utils'
import axios from 'axios';
import PlaceManagementSection from '@/views/PlaceManagementSection.vue';
import type { Place } from '@/models';
import { wrap } from 'module';

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
      .toHaveBeenCalledWith(`http://localhost:5172/places?${new URLSearchParams({ page: 1 as any as string, limit: 5 as any as string })}`);
    expect(axios.get).toHaveBeenCalledOnce();
    expect(wrapper.vm.places).toEqual(mockGetResponse.data.data);
    expect(wrapper.vm.hasNext).toBe(mockGetResponse.data.hasNext);
  });

  test('editBtnClick - formMode set to "edit" and sets placeToEdit correctly', async () => {
    const wrapper = mount(PlaceManagementSection);
    const place = mockGetResponse.data.data[0];

    // await new Promise(r => setTimeout(r, 1000));
    await wrapper.vm.$nextTick();
    await wrapper.vm.editBtnClick(place);

    expect(wrapper.vm.formMode).toBe('edit')
    expect(wrapper.vm.placeToEdit).toEqual(place);
  });

  test('addBtnClick - formMode set to "add"', async () => {
    const wrapper = mount(PlaceManagementSection);

    await new Promise(r => setTimeout(r, 1000));
    await wrapper.vm.addBtnClick();

    expect(wrapper.vm.formMode).toBe('add');
  });

  describe("addPlace", () => {
    let wrapper: Wrapper;
    beforeEach(() => {
      const YourComponent = PlaceManagementSection;
      wrapper = mount(YourComponent);
      wrapper.vm.formMode = 'add';
    });

    test('should handle successful addPlace request', async () => {

      vi.mocked(axios.post).mockResolvedValueOnce({ status: 201 });
      const mockPlace = mockGetResponse.data.data[0];
      await wrapper.vm.addPlace(mockPlace);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5172/places', mockPlace);
      expect(wrapper.vm.formMode).toBe('');
      // expect(wrapper.vm.$data.alertMessage).toBe('Successfully add the place')
    })

    test('should handle failed addPlace request', async () => {
      const mockPlace = mockGetResponse.data.data[0];
      vi.mocked(axios.post).mockResolvedValueOnce({status: 400});
      await wrapper.vm.addPlace(mockPlace)

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5172/places', mockPlace);
      expect(wrapper.vm.formMode).toBe('add');
      // expect(wrapper.vm.$data.alertMessage).toContain('Failed to add place')
    });

    test('should handle error connection to backend', async () => {
      const mockPlace = mockGetResponse.data.data[0];

      vi.mocked(axios.post).mockRejectedValueOnce(new Error());
      await wrapper.vm.addPlace(mockPlace);

      expect(wrapper.vm.formMode).toBe('add');
      // expect(wrapper.vm.$data.alertMessage).toContain('Failed to add place')
    });

  });

  describe("editPlace", () => {
    beforeEach(() => {
      vi.mocked(axios.put).mockReset();
    });

    test('should handle successful "editPlace" request', async () => {
      const wrapper = mount(PlaceManagementSection);
      wrapper.vm.formMode = 'edit';

      vi.mocked(axios.put).mockResolvedValueOnce({ status: 200 });
      const mockPlace = mockGetResponse.data.data[0];
      await wrapper.vm.editPlace(mockPlace);

      expect(axios.put).toHaveBeenCalledWith(`http://localhost:5172/places/${mockPlace._id}`, mockPlace);
      expect(wrapper.vm.formMode).toBe('');
      // expect(wrapper.vm.$data.alertMessage).toBe('Successfully add the place')
    })

    test('should handle failed "editPlace" request', async () => {
      const wrapper = mount(PlaceManagementSection);
      wrapper.vm.formMode = 'edit';

      const mockPlace = mockGetResponse.data.data[0];
      vi.mocked(axios.put).mockResolvedValueOnce({status: 404});
      await wrapper.vm.editPlace(mockPlace)

      expect(axios.put).toHaveBeenCalledWith(`http://localhost:5172/places/${mockPlace._id}`, mockPlace);
      expect(wrapper.vm.formMode).toBe('edit');
      // expect(wrapper.vm.$data.alertMessage).toContain('Failed to add place')
    });

    test('should handle error connection to backend', async () => {
      const wrapper = mount(PlaceManagementSection);
      wrapper.vm.formMode = 'edit';

      const mockPlace = mockGetResponse.data.data[0];
      vi.mocked(axios.put).mockRejectedValueOnce(new Error());

      await wrapper.vm.editPlace(mockPlace);

      expect(axios.put).toHaveBeenCalledWith(`http://localhost:5172/places/${mockPlace._id}`, mockPlace);
      expect(wrapper.vm.formMode).toBe('edit');
      // expect(wrapper.vm.$data.alertMessage).toContain('Failed to add place')
    });

  });

  
})