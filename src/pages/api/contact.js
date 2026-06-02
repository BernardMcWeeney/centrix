import { env } from 'cloudflare:workers';
import { onRequestPost } from '../../contact.js';

export const prerender = false;

export async function POST(context) {
  return onRequestPost({
    request: context.request,
    env,
  });
}
