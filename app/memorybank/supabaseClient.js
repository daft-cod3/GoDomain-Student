// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqgypyrfslrcyysscnss.supabase.co';
const supabaseKey = 'sb_publishable_AkV9JAv42lO4BknPLTc3mQ_kBYLykbs';

export const supabase = createClient(supabaseUrl, supabaseKey);
