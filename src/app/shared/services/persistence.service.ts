import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
export const CURRENT_SESSION_KEY = "current.session.key.ref.20240816";

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }

  updateWith(object: object): void {
    var session = this.loadUserProfile();
    var updated = Object.assign(session, object);
    this.saveUserProfile(updated)
  }

  saveUserProfile(session: UserProfile): void {
    console.info(session);
    this.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  }

  loadUserProfile(): UserProfile {
    var session = JSON.parse(this.getItem(CURRENT_SESSION_KEY) || "{}");
    console.info(session);
    return session;
  }

}
