import { fromEvent, Subscription, throttleTime } from "rxjs";
import { createSignal, onCleanup, onMount } from "solid-js";

export default function Gravity() {
  const [angleAlpha, setAngleAlpha] = createSignal(0);
  const [angleBeta, setAngleBeta] = createSignal(0);
  const [angleGamma, setAngleGamma] = createSignal(0);

  const coso = fromEvent(window, "deviceorientation");
  const subs$ = new Subscription();

  onMount(() => {
    subs$.add(
      coso.pipe(throttleTime(1000 / 60)).subscribe((click: any) => {
        console.log("click!:", click);
        setAngleAlpha(click.alpha);
        setAngleBeta(click.beta);
        setAngleGamma(click.gamma);
      })
    );
  });

  onCleanup(() => {
    subs$.unsubscribe();
  });

  return (
    <div
      style={{
        position: "relative",
        outline: "1px solid red",
        "border-radius": "250px",
        width: "500px",
        height: "500px",
      }}
    >
      <div style={{ display: "flex", "flex-direction": "column" }}>
        <span style={{ "font-size": "45px" }}>
          A (verde): {angleAlpha().toFixed(2)}
        </span>
        <span style={{ "font-size": "45px" }}>
          B (azul): {angleBeta().toFixed(2)}
        </span>
        <span style={{ "font-size": "45px" }}>
          G (rojo): {angleGamma().toFixed(2)}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: "250px",
          left: "250px",
          outline: "2px solid green",
          height: "200px",
          transform: `rotate(${angleAlpha()}deg)`,
          "transform-origin": "0px 0px ",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "250px",
          left: "250px",
          outline: "2px solid blue",
          height: "200px",
          transform: `rotate(${angleBeta()}deg)`,
          "transform-origin": "0px 0px ",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "250px",
          left: "250px",
          outline: "2px solid red",
          height: "200px",
          transform: `rotate(${angleGamma()}deg)`,
          "transform-origin": "0px 0px ",
        }}
      ></div>
    </div>
  );
}
