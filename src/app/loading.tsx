export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background/50">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
