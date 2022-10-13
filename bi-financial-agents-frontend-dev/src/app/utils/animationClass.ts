export async function AnimationClass(element: HTMLElement, animation: string) {
    return new Promise((resolve) => {
      element?.classList.add(animation);
      function handleAnimationEnd(event: any): void {
        event.stopPropagation();
        element?.classList.remove(animation);
        resolve('Animation ended');
      }
  
      element?.addEventListener('animationend', handleAnimationEnd, {
        once: true,
      });
    });
  }