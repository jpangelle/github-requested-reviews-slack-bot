function getMessage(pullRequestsUrls: string[]) {
  if (pullRequestsUrls.length === 0) {
    return {
      heading: 'There are no pull requests that need your review. Great job!',
    };
  }

  if (pullRequestsUrls.length === 1) {
    return {
      heading:
        'There is 1 pull request that needs your review. Please check it out!',
      body: pullRequestsUrls,
    };
  }

  return {
    heading: `There are ${pullRequestsUrls.length} pull requests that need your review. Please check them out!`,
    body: pullRequestsUrls,
  };
}

export { getMessage };
