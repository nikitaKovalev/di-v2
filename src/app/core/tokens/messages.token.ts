import { InjectionToken } from '@angular/core';

export type Messages = {
  successEdit: string;
  successDelete: string;
  successCreate: string;
  errorEdit: string;
  errorDelete: string;
  errorCreate: string;
  confirmDelete: string;
  delete: string;
};

export const MESSAGES = new InjectionToken<Messages>(
  'an abstarction over messages in crud service',
  {
    providedIn: 'root',
    factory: () => ({
      successEdit: 'Item has been successfully edited',
      successDelete: 'Item has been successfully deleted',
      successCreate: 'Item has been successfully created',
      errorEdit: 'Item has not been edited',
      errorDelete: 'Item has not been deleted',
      errorCreate: 'Item has not been created',
      confirmDelete: 'Are you sure you want to delete this item?',
      delete: 'Delete',
    }),
  }
);