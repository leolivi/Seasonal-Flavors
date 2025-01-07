<?php

namespace Config;

use Illuminate\Database\Eloquent\Model as BaseModel;
use WendellAdriel\Lift\Lift;

/**
 * @mixin \Eloquent
 *
 * @property int $id
 * @property string $created_at
 * @property string $updated_at
 */
class Model extends BaseModel {
  use Lift;

  protected static $unguarded = true;
}
