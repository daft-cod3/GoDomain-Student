function getUnitStatus(unit) {
  if (unit.unlocked) {
    return "Open";
  }

  return "Locked";
}

export default function UnitStrip({ activeUnitId, onSelectUnit, units }) {
  return (
    <div className="lp-unit-strip" role="tablist" aria-label="Learning units">
      {units.map((unit) => {
        const isActive = unit.id === activeUnitId;

        return (
          <button
            key={unit.id}
            className={`lp-unit-pill ${isActive ? "active" : ""} ${unit.unlocked ? "open" : "locked"}`}
            type="button"
            onClick={() => onSelectUnit(unit.id)}
            aria-pressed={isActive}
          >
            <span className="lp-unit-pill-top">
              <strong>{unit.label}</strong>
              <em>{getUnitStatus(unit)}</em>
            </span>
            <span className="lp-unit-pill-title">{unit.title}</span>
            <span className="lp-unit-pill-meta">
              {unit.completedLessons}/{unit.lessons.length} lessons done
            </span>
            <span className="lp-unit-pill-track" aria-hidden="true">
              <span style={{ width: `${unit.progress}%` }} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
