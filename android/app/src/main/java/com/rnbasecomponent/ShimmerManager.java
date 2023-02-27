package com.rnbasecomponent;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.shimmer.Shimmer;

public class ShimmerManager extends ViewGroupManager<ShimmerView> {

  public static final String REACT_CLASS = "RCTShimmeringView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ShimmerView createViewInstance(ThemedReactContext context) {
    return new ShimmerView(context);
  }

  @ReactProp(name = "animating", defaultBoolean = true)
  public void setAnimating(ShimmerView view, boolean value) {
    view.getBuilder().setAutoStart(value);
    view.updateShimmer();
  }

  @ReactProp(name = "shimmeringOpacity", defaultFloat = 0.5f)
  public void setBaseOpacity(ShimmerView view, float value) {
    if (value > 1.0f) {
      value = 1.0f;
    }
    if (value < 0.0f) {
      value = 0.0f;
    }

    view.getBuilder().setBaseAlpha(value);
    view.updateShimmer();
  }

  @ReactProp(name = "animationOpacity", defaultFloat = 1.0f)
  public void setHighlightOpacity(ShimmerView view, float value) {
    if (value > 1.0f) {
      value = 1.0f;
    }
    if (value < 0.0f) {
      value = 0.0f;
    }

    view.getBuilder().setHighlightAlpha(value);
    view.updateShimmer();
  }

  @ReactProp(name = "shimmeringDirection")
  public void setDirection(ShimmerView view, String value) {
    int direction = Shimmer.Direction.LEFT_TO_RIGHT;
    switch (value) {
      case "up":
        direction = Shimmer.Direction.BOTTOM_TO_TOP;
        break;
      case "left":
        direction = Shimmer.Direction.RIGHT_TO_LEFT;
        break;
      case "down":
        direction = Shimmer.Direction.TOP_TO_BOTTOM;
        break;
      case "right":
      default:
        break;
    }

    view.getBuilder().setDirection(direction);
    view.updateShimmer();
  }

  @ReactProp(name = "duration", defaultInt = 1000)
  public void setDuration(ShimmerView view, int value) {
    if (value < 0) {
      value = 0;
    }

    view.getBuilder().setDuration(value);
    view.updateShimmer();
  }

  @ReactProp(name = "pauseDuration", defaultInt = 400)
  public void setPauseDuration(ShimmerView view, int value) {
    if (value < 0) {
      value = 0;
    }

    view.getBuilder().setRepeatDelay(value);
    view.updateShimmer();
  }

  @ReactProp(name = "tilt", defaultFloat = 0.0f)
  public void setTilt(ShimmerView view, int value) {
    view.getBuilder().setTilt(value);
    view.updateShimmer();
  }

  @ReactProp(name = "intensity", defaultFloat = 0.0f)
  public void setIntensity(ShimmerView view, float value) {
    if (value > 1.0f) {
      value = 1.0f;
    }
    if (value < 0.0f) {
      value = 0.0f;
    }

    view.getBuilder().setIntensity(value);
    view.updateShimmer();
  }
}
