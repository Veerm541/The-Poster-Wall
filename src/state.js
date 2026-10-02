// Shared mutable app state (modules can't reassign each other's variables)
export const state = {
  posts: [],
  shuffled: false,
  liveMode: false,
  sb: null,
  attachedGif: null
};
