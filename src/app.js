import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';
import { state } from './state.js';
import { render, setStatus } from './wall.js';

/* =========================
   INITIALIZE SUPABASE
========================= */

(async function init() {

    if (
        typeof SUPABASE_URL === 'undefined' ||
        typeof SUPABASE_ANON_KEY === 'undefined'
    ) {

        setStatus(false);

        render();

        return;

    }

    try {

        state.sb =
            createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );

        const {
            data,
            error
        } =
            await state.sb
                .from('messages')
                .select('*')
                .order(
                    'ts',
                    {
                        ascending: false
                    }
                )
                .limit(80);

        if (error) {
            throw error;
        }

        state.posts =
            data || [];

        setStatus(true);

        render();

        state.sb
            .channel('messages-live')

            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages'
                },

                (payload) => {

                    state.posts.unshift(
                        payload.new
                    );

                    if (
                        state.posts.length > 80
                    ) {
                        state.posts.pop();
                    }

                    render();

                }
            )

            .subscribe();

    } catch (e) {

        setStatus(false);

        render();

    }

})();
