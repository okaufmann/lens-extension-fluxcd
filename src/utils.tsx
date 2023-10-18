import moment from "moment";
import { HelmRelease } from "./k8s/fluxcd/helmrelease";

/**
 * This function formats durations in a more human readable form.
 * @param timeValue the duration in milliseconds to format
 */
export function formatDuration(timeValue: number, compact = true) {
  const duration = moment.duration(timeValue, "milliseconds");
  const seconds = Math.floor(duration.asSeconds());
  const separator = compact ? "" : " ";

  if (seconds < 0) {
    return "0s";
  } else if (seconds < 60 * 2) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(duration.asMinutes());

  if (minutes < 10) {
    const seconds = duration.seconds();

    return getMeaningfulValues([minutes, seconds], ["m", "s"], separator);
  } else if (minutes < 60 * 3) {
    if (!compact) {
      return getMeaningfulValues([minutes, duration.seconds()], ["m", "s"]);
    }

    return `${minutes}m`;
  }

  const hours = Math.floor(duration.asHours());

  if (hours < 8) {
    const minutes = duration.minutes();

    return getMeaningfulValues([hours, minutes], ["h", "m"], separator);
  } else if (hours < 48) {
    if (compact) {
      return `${hours}h`;
    } else {
      return getMeaningfulValues([hours, duration.minutes()], ["h", "m"]);
    }
  }

  const days = Math.floor(duration.asDays());

  if (days < 8) {
    const hours = duration.hours();

    if (compact) {
      return getMeaningfulValues([days, hours], ["d", "h"], separator);
    } else {
      return getMeaningfulValues([days, hours, duration.minutes()], ["d", "h", "m"]);
    }
  }
  const years = Math.floor(duration.asYears());

  if (years < 2) {
    if (compact) {
      return `${days}d`;
    } else {
      return getMeaningfulValues([days, duration.hours(), duration.minutes()], ["d", "h", "m"]);
    }
  } else if (years < 8) {
    const days = duration.days();

    if (compact) {
      return getMeaningfulValues([years, days], ["y", "d"], separator);
    }
  }

  if (compact) {
    return `${years}y`;
  }

  return getMeaningfulValues([years, duration.days(), duration.hours(), duration.minutes()], ["y", "d", "h", "m"]);
}

function getMeaningfulValues(values: number[], suffixes: string[], separator = " ") {
  return values
    .map((a, i): [number, string] => [a, suffixes[i]])
    .filter(([dur]) => dur > 0)
    .map(([dur, suf]) => dur + suf)
    .join(separator);
}

export  function getStatusClass(obj: HelmRelease) {
  const status = getStatus(obj)
  switch (status) {
  case 'ready':
    return 'success';
  case 'not-ready':
    return 'error';
  case 'suspended':
    return 'info';
  case 'in-progress':
    return 'warning';
  default:
    return '';
  }
}

export function getStatusText(obj: HelmRelease): string {
  const status = getStatus(obj)
  switch (status) {
  case 'ready':
    return 'Ready';
  case 'not-ready':
    return 'Not Ready';
  case 'suspended':
    return 'Suspended';
  case 'in-progress':
    return 'In Progress';
  default:
    return 'unknown';
  }
}

export function getStatusMessage(obj: HelmRelease): string {
  return obj.status?.conditions
    .find((c: any) => c.type === "Ready")?.message || 'unknown';
}

function getStatus(obj: HelmRelease) {
  if (obj.spec.suspend) return 'suspended';
  if (obj.status?.conditions.find((c: any) => c.type === "Ready").status === "True") return 'ready';
  if (obj.status?.conditions.find((c: any) => c.type === "Ready").status === "False") return 'not-ready';
  return 'in-progress';
}
