package com.rnbasecomponent;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

import com.facebook.shimmer.Shimmer;
import com.facebook.shimmer.ShimmerFrameLayout;

public class ShimmerView extends ShimmerFrameLayout {
  private Shimmer.Builder builder = new Shimmer.AlphaHighlightBuilder();

  public ShimmerView(Context context) {
    super(context);
  }

  public ShimmerView(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public ShimmerView(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  @TargetApi(Build.VERSION_CODES.LOLLIPOP)
  public ShimmerView(
    Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
    super(context, attrs, defStyleAttr, defStyleRes);
  }

  public Shimmer.Builder getBuilder() {
    return builder;
  }

  public void updateShimmer() {
    setShimmer(builder.build());
  }
}
