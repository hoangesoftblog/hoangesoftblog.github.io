import { describe, expect, test, vi, beforeEach } from 'vitest';
import { flushPromises, mount, VueWrapper as Wrapper} from '@vue/test-utils';
import axios from 'axios';
import PlaceManagementSection from '@/views/PlaceManagementSection.vue';
import type { Place } from '@/models';

vi.mock("axios");

describe('PlaceManagementSection.vue', () => {
  const mockGetResponse: {data: {data: Place[], hasNext: boolean}} = {
    data: {
      "data": [
          {
              "_id": "65807b72a17c9e19ef685c11",
              "name": "Laziest of them all Coffee Shop",
              "category": "cafe",
              "address": {
                  "street": "123 Main Street",
                  "city": "Sunnyville",
                  "district": "Central District",
                  "postalCode": "12345"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -122.12345,
                      37.12345
                  ]
              },
              "openingHours": {
                  "start": "07:00AM",
                  "end": "10:00PM"
              },
              "createdAt": "2023-12-19T00:00:00.000Z",
              "updatedAt": "2024-01-14T14:40:32.623Z"
          },
          {
              "_id": "65807ba2a17c9e19ef68623b",
              "name": "Hidden Book Nook",
              "category": "bookstore",
              "address": {
                  "street": "789 Oak Street",
                  "city": "Bookhaven",
                  "district": "Old Town",
                  "postalCode": "90123"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -120.90123,
                      39.90123
                  ]
              },
              "openingHours": {
                  "start": "11:00AM",
                  "end": "09:00PM",
                  "extendedHoursOnFridays": true
              },
              "createdAt": "2023-12-17T14:00:00.000Z",
              "updatedAt": "2023-12-17T14:00:00.000Z"
          },
          {
              "_id": "65807bf5a17c9e19ef686c61",
              "name": "Vibrant Food Market",
              "category": "grocery",
              "address": {
                  "street": "1011 Pine Street",
                  "city": "Freshland",
                  "district": "South Market",
                  "postalCode": "34567"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -119.34567,
                      40.34567
                  ]
              },
              "openingHours": {
                  "start": "08:00AM",
                  "end": "08:00PM",
                  "closedOnSundays": true
              },
              "createdAt": "2023-12-16T18:00:00.000Z",
              "updatedAt": "2023-12-16T18:00:00.000Z"
          },
          {
              "_id": "658308c19d27312da3b4a272",
              "name": "Lively Art Studio",
              "category": "art",
              "address": {
                  "street": "456 Elm Street",
                  "city": "Hopeville",
                  "district": "East side",
                  "postalCode": "56789"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -121.56789,
                      38.56789
                  ]
              },
              "openingHours": {
                  "start": "10:00AM",
                  "end": "06:00PM",
                  "closedOnMondays": true
              },
              "createdAt": "2023-12-18T10:00:00.000Z",
              "updatedAt": "2023-12-18T10:00:00.000Z"
          },
          {
              "_id": "6584fab09d27312da305d3df",
              "name": "Movie Magic Cinema",
              "category": "cinema",
              "address": {
                  "street": "1415 Hollywood Blvd",
                  "city": "Starlight City",
                  "district": "Downtown",
                  "postalCode": "23456"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -117.23456,
                      42.23456
                  ]
              },
              "amenities": [
                  "luxury seating",
                  "concessions stand",
                  "arcade",
                  "IMAX theater"
              ],
              "openingHours": {
                  "start": "10:00AM",
                  "end": "12:00AM",
                  "lateNightShowingsFridaySaturday": true
              },
              "createdAt": "2023-12-14T12:00:00.000Z",
              "updatedAt": "2023-12-14T12:00:00.000Z"
          },
          {
              "_id": "6584fadf9d27312da305d9cf",
              "name": "Buzzing Board Game Cafe",
              "category": "games",
              "address": {
                  "street": "1819 Dice Avenue",
                  "city": "Funhaven",
                  "district": "Central District",
                  "postalCode": "89012"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -115.89012,
                      44.89012
                  ]
              },
              "amenities": [
                  "extensive board game library",
                  "cozy seating areas",
                  "snacks and drinks menu",
                  "friendly staff to recommend games"
              ],
              "openingHours": {
                  "start": "12:00PM",
                  "end": "11:00PM",
                  "board game tournaments on Saturdays": true
              },
              "createdAt": "2023-12-12T10:00:00.000Z",
              "updatedAt": "2023-12-12T10:00:00.000Z"
          },
          {
              "_id": "6584fb3b9d27312da305e5a3",
              "name": "Serene Art Gallery",
              "category": "art",
              "address": {
                  "street": "2021 Brushstroke Street",
                  "city": "Museville",
                  "district": "Art District",
                  "postalCode": "12345"
              },
              "location": {
                  "type": "Point",
                  "coordinates": [
                      -114.12345,
                      45.12345
                  ]
              },
              "amenities": [
                  "rotating exhibits",
                  "artist talks and workshops",
                  "gift shop featuring local artists",
                  "courtyard with sculptures"
              ],
              "openingHours": {
                  "start": "10:00AM",
                  "end": "06:00PM",
                  "free admission on Tuesdays": true
              },
              "createdAt": "2023-12-13T06:00:00.000Z",
              "updatedAt": "2023-12-13T06:00:00.000Z"
          }
      ],
      "hasNext": false
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

    // // Wait until DOM updates
    // // https://test-utils.vuejs.org/guide/advanced/http-requests.html#A-list-of-blog-posts
    // // Todo: Update remaining tests with fushPromises();
    // await wrapper.vm.$nextTick();
    // await new Promise(r => setTimeout(r, 1000));
    await flushPromises();

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