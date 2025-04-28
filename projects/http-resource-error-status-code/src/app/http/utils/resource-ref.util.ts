import { HttpErrorResponse, HttpResourceRef } from "@angular/common/http";
import { computed } from "@angular/core";
import { Pokemon } from '../schemas/pokemon.schema';

export function makeResourceRefStatus(resourceRef: HttpResourceRef<Pokemon | undefined>){
  return {
    error: computed(() => 
      resourceRef.error() ? resourceRef.error() as HttpErrorResponse : undefined
    ),
    statusCode: computed(() => resourceRef.statusCode() ? resourceRef.statusCode() : undefined),
    headers: computed(() => resourceRef.headers() ? resourceRef.headers() : undefined),
    value: computed(() => resourceRef.hasValue() ? resourceRef.value() : undefined)
  }
}
