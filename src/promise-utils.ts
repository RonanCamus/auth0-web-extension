const singlePromiseMap: Record<string, Promise<any>> = {};

export const delay = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

export const singlePromise = <T>(
  cb: () => Promise<T>,
  key: string,
  ignoreMap = false
) => {
  console.log('[auth0-web-extension] singlePromise() key', key);
  let promise = singlePromiseMap[key];
  if (!ignoreMap && !promise) {
    console.log('[auth0-web-extension] singlePromise() there is no promise');
    promise = cb().finally(() => {
      console.log('[auth0-web-extension] singlePromise() completing finally');
      delete singlePromiseMap[key];
      promise = undefined;
    });
    singlePromiseMap[key] = promise;
  } else if (ignoreMap) {
    // don't rate
    promise = cb();
  }
  return promise;
};

export const retryPromise = async (
  cb: () => Promise<boolean>,
  maxNumberOfRetries = 3
) => {
  for (let i = 0; i < maxNumberOfRetries; i++) {
    if (await cb()) {
      return true;
    }
  }

  return false;
};

export const retryPromiseOnReject = async <T>(
  cb: () => Promise<T>,
  maxNumberOfRetries = 3
): Promise<T | null> => {
  for (let i = 0; i < maxNumberOfRetries; i++) {
    try {
      const result = await cb();
      return result;
    } catch (error) {
      continue;
    }
  }

  return null;
};
