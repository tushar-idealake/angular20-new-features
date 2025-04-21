import { HttpErrorResponse, HttpResourceRef } from "@angular/common/http";
import { computed } from "@angular/core";

export function makeResourceRefStatus(resourceRef: HttpResourceRef<unknown | undefined>){
  return {
    error: computed(() => 
      resourceRef.error() ? resourceRef.error() as HttpErrorResponse : undefined
    ),
    statusCode: computed(() => resourceRef.statusCode() ? resourceRef.statusCode() : undefined),
    headers: computed(() => resourceRef.headers() ? resourceRef.headers() : undefined)
  }
}
