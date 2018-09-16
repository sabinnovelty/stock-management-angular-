<<<<<<< HEAD
import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { InventoryService } from '../services/inventoryService';
import { HttpClient } from '../services/httpService';
import { HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend, BaseRequestOptions, Jsonp, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpXhrBackend } from '@angular/common/http';


describe('InventoryService', () => {

  let service: InventoryService;

  const response = {
    count: 3
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ HttpModule ],
      providers: [ 
        HttpClient, 
        InventoryService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    .compileComponents();
  });

  it('For the total inventory count', async(inject(
    [InventoryService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(response) })))
      });

      const result = service.fetchTotalNoProduct();

      result.subscribe(
        res => {
          expect(res.count).toBeGreaterThan(0);
        }
      );
    })
  ))
=======
import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { InventoryService } from '../services/inventoryService';
import { HttpClient } from '../services/httpService';
import { HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend, BaseRequestOptions, Jsonp, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpXhrBackend } from '@angular/common/http';


describe('InventoryService', () => {

  let service: InventoryService;

  const response = {
    count: 3
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ HttpModule ],
      providers: [ 
        HttpClient, 
        InventoryService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    .compileComponents();
  });

  it('For the total inventory count', async(inject(
    [InventoryService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(response) })))
      });

      const result = service.fetchTotalNoProduct();

      result.subscribe(
        res => {
          expect(res.count).toBeGreaterThan(0);
        }
      );
    })
  ))
>>>>>>> 7c86996f5b43fc1ebbe208644496d402da74fde6
});