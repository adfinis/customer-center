/**
 * @module customer-center
 * @submodule customer-center-transforms
 * @public
 */
import MomentTransform from 'customer-center/transforms/moment'

/**
 * The django datetime transform
 *
 * This transforms a django datetime into a moment datetime
 *
 * @class DjangoDatetimeTransform
 * @extends MomentTransform
 * @public
 */
export default MomentTransform.extend({
  /**
   * The date format
   *
   * @property {String} format
   * @public
   */
  format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
})
