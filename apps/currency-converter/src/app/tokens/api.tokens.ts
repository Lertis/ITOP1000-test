import { HttpClient } from '@angular/common/http'
import { inject, InjectionToken } from '@angular/core'

import { ApiService } from '../services'
import { IApiService } from '../model'

export const API_SERVICE = new InjectionToken<IApiService>(
  'API_SERVICE',
  { factory: () => new ApiService(inject(HttpClient)) }
)
