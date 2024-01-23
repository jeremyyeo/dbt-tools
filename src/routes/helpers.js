const getPosition = (line) => {
  /* 
    "03:26:00  1 of 4 START sql table model public.bar ........................................ [RUN]"
    -> 1
  */
  return Number(line.match(/ ([0-9]+) of ([0-9]+) /)[1]);
};

const getModelName = (line) => {
  /*
    "03:26:00  1 of 4 START sql table model public.bar ........................................ [RUN]"
    -> public.bar
  */
  return line.match(/ model (.*) \.+/)[1];
};

const getFirstUniqueIndex = (list) => {
  const unique = [...new Set(list)].filter(
    (i) => list.indexOf(i) === list.lastIndexOf(i)
  );
  return list.indexOf(unique[0]);
};

export const getFirstUniqueLogLine = (list) => {
  const matchingLines = list.filter((i) =>
    i.match(/[0-9]+ of [0-9]+ .* model .*/)
  );
  const positions = matchingLines.map((l) => {
    return getPosition(l);
  });
  const firstUnique = getFirstUniqueIndex(positions);
  return firstUnique >= 0
    ? matchingLines[firstUnique]
    : list == ""
    ? "Please paste in some log lines."
    : "All models have were run successfully or errors are obvious in the logs.";
};
