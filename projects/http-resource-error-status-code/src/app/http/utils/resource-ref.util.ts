import { HttpErrorResponse, HttpResourceRef } from "@angular/common/http";
import { computed } from "@angular/core";
import { Pokemon } from '../schemas/pokemon.schema';

export function makeResourceRefStatus(resourceRef: HttpResourceRef<Pokemon | undefined>){ // works like middleware
  return {
    error: computed(() => {
      alert('API call pending');
      resourceRef.error() ? resourceRef.error() as HttpErrorResponse : undefined
    }
    ),
    statusCode: computed(() => resourceRef.statusCode() ? resourceRef.statusCode() : undefined),
    headers: computed(() => resourceRef.headers() ? resourceRef.headers() : undefined),
    value: computed(() => {
      console.log(resourceRef.value(), 'changes'); // consoles and returns value if there is value
      resourceRef.hasValue() ? resourceRef.value() : undefined
    }
  )
  }
}
