export const idlFactory = ({ IDL }) => {
  const UrlEntry = IDL.Record({ 'url' : IDL.Text, 'timestamp' : IDL.Int });
  return IDL.Service({
    'addUrl' : IDL.Func([IDL.Text], [IDL.Vec(UrlEntry)], []),
    'getHistory' : IDL.Func([], [IDL.Vec(UrlEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
