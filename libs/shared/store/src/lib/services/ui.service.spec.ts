import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiService);
    const localStorageMock = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("toggleDarkMode", () => {
    it("should set isDarkMode as true", () => {
      service.isDarkMode = false;
      service.toggleDarkMode(true).subscribe(status => {
        expect(status).toBeTruthy();
      })
    })
  })
  describe("getDarkModeStatus", () => {
    it("should set isDarkMode as true if it's save in localstorage as true", () => {
      jest.spyOn(localStorage, "getItem").mockReturnValue("true");
      service.isDarkMode = false;
      service.getDarkModeStatus().subscribe(isDarkMode => {
        expect(isDarkMode).toBeTruthy();
      })
    })
  })
  describe("toggleHideSidebar", () => {
    it("should set hideSidebar as true", () => {
      service.hideSidebar  = false;
      service.toggleHideSidebar(true).subscribe(status => {
        expect(status).toBeTruthy();
      })
    })
  })
  describe("getSideBarVisibility", () => {
    it("should set hideSidebar as true if it's save in localstorage as true", () => {
      jest.spyOn(localStorage, "getItem").mockReturnValue("true");
      service.hideSidebar = false;
      service.getSideBarVisibility().subscribe(hideSidebar => {
        expect(hideSidebar).toBeTruthy();
      })
    })
  })
});
